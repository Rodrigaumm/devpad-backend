import { inject, injectable } from 'tsyringe';

import INotesRepository from '@modules/Notes/repositories/INotesRepository';
import AppError from '@shared/errors/AppError';
import Note from '../infra/typeorm/entities/Notes';

@injectable()
class GetNoteInfoService {
    constructor(
        @inject('NotesRepository') private notesRepository: INotesRepository,
    ) {}

    public async execute(noteId: string, userId: string): Promise<Note> {
        const noteInfo = await this.notesRepository.findOne(noteId, userId);

        if (!noteInfo) {
            throw new AppError('Unable to find requested note');
        }

        noteInfo.content = JSON.parse(noteInfo.content);

        return noteInfo;
    }
}

export default GetNoteInfoService;
