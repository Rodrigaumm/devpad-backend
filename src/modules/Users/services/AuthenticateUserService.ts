import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';

import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/Users';

interface IAuthData {
    email: string;
    password: string;
}

interface IResponse {
    token: string;
    user: User;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository') private usersRepository: IUsersRepository,
    ) {}

    public async execute({ email, password }: IAuthData): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('incorrect email/password combination', 403);
        }

        const passwordMatches = await compare(password, user.password);

        if (!passwordMatches) {
            throw new AppError('incorrect email/password combination', 403);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            expiresIn,
            subject: user.id,
        });

        return { token, user };
    }
}

export default AuthenticateUserService;
