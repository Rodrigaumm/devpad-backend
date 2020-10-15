import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import NotesController from '../controllers/NotesController';
import NoteTagsController from '../controllers/NoteTagsController';

const notesRouter = Router();
const notesController = new NotesController();
const noteTagsController = new NoteTagsController();

notesRouter.use(ensureAuthenticated);

notesRouter.get('/tags', noteTagsController.index);

notesRouter.get('/', notesController.show);
notesRouter.get('/:id', notesController.index);
notesRouter.put('/:id', notesController.update);
notesRouter.post('/', notesController.create);
notesRouter.delete('/:id', notesController.destroy);

export default notesRouter;
