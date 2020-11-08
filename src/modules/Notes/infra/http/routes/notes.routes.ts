import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import NotesController from '../controllers/NotesController';

const notesRouter = Router();
const notesController = new NotesController();

notesRouter.use(ensureAuthenticated);

notesRouter.get('/', notesController.show);
notesRouter.get('/:id', notesController.index);
notesRouter.put('/:id', notesController.update);
notesRouter.post('/', notesController.create);
notesRouter.delete('/:id', notesController.destroy);

export default notesRouter;
