import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserCreationDTO from '../dtos/IUserCreationDTO';
import User from '../infra/typeorm/entities/Users';

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository') private usersRepository: IUsersRepository,
    ) {}

    public async execute({
        username,
        email,
        password,
    }: IUserCreationDTO): Promise<User> {
        const checkUserEmail = await this.usersRepository.findByEmail(email);

        if (checkUserEmail) {
            throw new AppError('Email address already used.');
        }

        const checkUsername = await this.usersRepository.findByUsername(
            username,
        );

        if (checkUsername) {
            throw new AppError('Username already used');
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.usersRepository.create({
            username,
            email,
            password: hashedPassword,
        });
        return user;
    }
}

export default CreateUserService;
