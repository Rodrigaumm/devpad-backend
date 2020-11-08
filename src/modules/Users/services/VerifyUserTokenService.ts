import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/Users';

interface IResponse {
    expired: boolean;
    expiredAt?: Date;
}

@injectable()
class AuthenticateUserService {
    public async execute(token: string): Promise<IResponse> {
        const result = {} as IResponse;

        try {
            await verify(token, authConfig.jwt.secret);
            result.expired = false;
        } catch (JWTError) {
            if (JWTError.name === 'TokenExpiredError') {
                result.expired = true;
                result.expiredAt = JWTError.expiredAt;
            }
        }

        return result;
    }
}

export default AuthenticateUserService;
