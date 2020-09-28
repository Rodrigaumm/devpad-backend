import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const testeRouter = Router();

testeRouter.get('/', ensureAuthenticated, (req, res) => {
    return res.json({
        id: req.user.id,
    });
});

export default testeRouter;
