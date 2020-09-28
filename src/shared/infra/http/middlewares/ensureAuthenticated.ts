import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

const ensureAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        throw new AppError('Missing auth token', 401);
    }

    const [, token] = bearer.split(' ');

    const { secret } = authConfig.jwt;

    try {
        const decodedToken = verify(token, secret);

        const { sub } = decodedToken as ITokenPayload;

        req.user = {
            id: sub,
        };

        return next();
    } catch (err) {
        throw new AppError('Invalid auth token', 401);
    }
};

export default ensureAuthenticated;
