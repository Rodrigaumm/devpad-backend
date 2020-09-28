import { Router } from 'express';

import UserController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UserController();

usersRouter.post('/', usersController.create);
usersRouter.get('/:username', usersController.index);

export default usersRouter;
