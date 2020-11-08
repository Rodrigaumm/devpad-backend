import { Router } from 'express';

import UserController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UserController();

usersRouter.post('/', usersController.create);
usersRouter.get('/:id', usersController.index);

export default usersRouter;
