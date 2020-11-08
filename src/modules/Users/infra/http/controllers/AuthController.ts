import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/Users/services/AuthenticateUserService';
import VerifyUserToken from '@modules/Users/services/VerifyUserTokenService';

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

    public async show(req: Request, res: Response): Promise<Response> {
        const { token } = req.params;

        const verifyUserTokenService = new VerifyUserToken();

        const status = await verifyUserTokenService.execute(token);

        return res.status(200).json({
            status,
        });
    }
}

export default AuthController;
