import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTagService from '@modules/Tags/services/CreateTagService';
import ListTagsService from '@modules/Tags/services/ListTagsService';
import DeleteTagService from '@modules/Tags/services/DeleteTagService';

class TagsController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { name, color } = req.body;
        const { id: userId } = req.user;

        const createTagService = container.resolve(CreateTagService);

        const tag = await createTagService.execute({
            name,
            color,
            userId,
        });

        return res
            .status(200)
            .json({ status: ['success', 'tag created successfully'], tag });
    }

    public async index(req: Request, res: Response): Promise<Response> {
        const listTagsService = container.resolve(ListTagsService);

        const tags = await listTagsService.execute(req.user.id);

        return res
            .status(200)
            .json({ status: ['success', 'tags listed successfully'], tags });
    }

    public async destroy(req: Request, res: Response): Promise<Response> {
        const { tagId } = req.body;
        const userId = req.user.id;
        const deleteTagService = container.resolve(DeleteTagService);

        await deleteTagService.execute(tagId, userId);

        return res.status(200).json({
            status: ['success', 'tag deleted successfully'],
        });
    }
}

export default TagsController;
