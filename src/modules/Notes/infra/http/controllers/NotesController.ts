import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateNoteService from '@modules/Notes/services/CreateNoteService';
import GetNoteInfoService from '@modules/Notes/services/GetNoteInfoService';
import ListAllNotesService from '@modules/Notes/services/ListAllNotesService';
import DeleteNoteService from '@modules/Notes/services/DeleteNoteService';
import EditNoteContentService from '@modules/Notes/services/EditNoteService';

class NotesController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { title, content: jsContent, tags, isLink } = req.body;
        const userId = req.user.id;
        const createNoteService = container.resolve(CreateNoteService);

        if (!title) {
            return res
                .status(400)
                .json({ status: ['error', 'missing note title'] });
        }

        if (!jsContent) {
            return res
                .status(400)
                .json({ status: ['error', 'missing note content'] });
        }

        if (isLink) {
            if (!jsContent.url) {
                return res.status(400).json({
                    status: [
                        'error',
                        "isLink is true but content doesn't has url property",
                    ],
                });
            }
        }

        const content = JSON.stringify(jsContent);

        const note = await createNoteService.execute({
            title,
            content,
            tagsNames: tags,
            isLink,
            userId,
        });

        return res
            .status(200)
            .json({ status: ['success', 'note created successfully'], note });
    }

    public async index(req: Request, res: Response): Promise<Response> {
        const noteId = req.params.id;
        const userId = req.user.id;

        const getNoteInfoService = container.resolve(GetNoteInfoService);

        const note = await getNoteInfoService.execute(noteId, userId);

        return res.status(200).json({
            status: ['success', 'note info loaded successfully'],
            note,
        });
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const userId = req.user.id;
        const listAllNotesService = container.resolve(ListAllNotesService);

        const notes = await listAllNotesService.execute(userId);

        return res.status(200).json({
            status: ['success', 'notes listed successfully'],
            notes,
        });
    }

    public async destroy(req: Request, res: Response): Promise<Response> {
        const noteId = req.params.id;
        const { id: userId } = req.user;
        const deleteNoteService = container.resolve(DeleteNoteService);

        await deleteNoteService.execute(noteId, userId);

        return res.status(200).json({
            status: ['success', 'note deleted successfully'],
        });
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { title, content, tags, isLink } = req.body;
        const noteId = req.params.id;
        const userId = req.user.id;
        const editNoteService = container.resolve(EditNoteContentService);

        if (isLink) {
            if (!content.url) {
                return res.status(400).json({
                    status: [
                        'error',
                        "isLink is true but content doesn't has url property",
                    ],
                });
            }
        }

        const newNote = await editNoteService.execute({
            noteId,
            userId,
            title,
            content,
            isLink,
            tags,
        });

        return res.status(200).json({
            status: ['success', 'note edited successfully'],
            newNote,
        });
    }
}

export default NotesController;
