import { Router } from 'express';

import AuthController from '../controllers/AuthController';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/', authController.create);
authRouter.get('/verify/:token', authController.show);

export default authRouter;
