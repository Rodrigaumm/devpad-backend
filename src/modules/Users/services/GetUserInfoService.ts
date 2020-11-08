import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/Users';

@injectable()
class GetUserService {
    constructor(
        @inject('UsersRepository') private usersRepository: IUsersRepository,
    ) {}

    public async execute(username: string): Promise<User> {
        const user = await this.usersRepository.findById(username);

        if (!user) {
            throw new AppError('User not found');
        }

        return user;
    }
}

export default GetUserService;
