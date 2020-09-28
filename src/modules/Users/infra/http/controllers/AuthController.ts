import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/Users/services/AuthenticateUserService';

class AuthController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const authenticateUserService = container.resolve(
            AuthenticateUserService,
        );

        const { token, user } = await authenticateUserService.execute({
            email,
            password,
        });

        return res.status(200).json({
            token,
            user: {
                id: user.id,
                username: user.username,
            },
        });
    }
}

export default AuthController;
