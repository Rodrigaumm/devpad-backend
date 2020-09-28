import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import TagsController from '../controllers/TagsController';

const tagsRouter = Router();
const tagsController = new TagsController();

tagsRouter.use(ensureAuthenticated);

tagsRouter.post('/', tagsController.create);
tagsRouter.get('/', tagsController.index);
tagsRouter.delete('/', tagsController.destroy);

export default tagsRouter;
