import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListNoteByTagService from '@modules/Notes/services/ListNoteByTagService';
import AppError from '@shared/errors/AppError';

class NoteTagsController {
    public async index(req: Request, res: Response): Promise<Response> {
        const userId = req.user.id;
        const tagsParam = req.query.names;
        const listNoteByTagService = container.resolve(ListNoteByTagService);

        if (!tagsParam) {
            throw new AppError('missing tags query param');
        }

        if (typeof tagsParam !== 'string') {
            throw new AppError('invalid query parameter format');
        }

        const tags = tagsParam.split(',');
        const notes = await listNoteByTagService.execute(tags, userId);

        return res
            .status(200)
            .json({ status: ['success', 'notes listed successfully'], notes });
    }
}

export default NoteTagsController;
