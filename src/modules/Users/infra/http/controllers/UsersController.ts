import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/Users/services/CreateUserService';
import GetUserService from '@modules/Users/services/GetUserInfoService';
import AppError from '@shared/errors/AppError';

export default class UsersController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { username, email, password } = req.body;
        const createUserService = container.resolve(CreateUserService);

        if (!username) {
            throw new AppError('Missing username');
        }

        if (!email) {
            throw new AppError('Missing email');
        }

        if (!password) {
            throw new AppError('Missing password');
        }

        const user = await createUserService.execute({
            username,
            email,
            password,
        });

        return res.status(200).json({
            status: ['success', 'user created successfully'],
            user: {
                id: user.id,
                username: user.username,
            },
        });
    }

    public async index(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const getUserService = container.resolve(GetUserService);
        const user = await getUserService.execute(id);

        return res.status(200).json({
            status: ['success', 'user info listed successfully'],
            user: {
                id: user.id,
                username: user.username,
                tags: user.tags,
                notes: user.notes,
                createdAt: user.createdAt,
            },
        });
    }
}
