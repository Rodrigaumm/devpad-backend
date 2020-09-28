import { Router } from 'express';

import notesRouter from '@modules/Notes/infra/http/routes/notes.routes';
import authRouter from '@modules/Users/infra/http/routes/auth.routes';
import usersRouter from '@modules/Users/infra/http/routes/users.routes';
import tagsRouter from '@modules/Tags/infra/http/routes/tags.routes';

import testeRouter from '@modules/Users/infra/http/routes/teste.routes';

const routes = Router();

routes.use('/notes', notesRouter);
routes.use('/users', usersRouter);
routes.use('/auth', authRouter);
routes.use('/tags', tagsRouter);

routes.use('/teste', testeRouter);

export default routes;
