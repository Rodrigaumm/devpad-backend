import { injectable, inject } from 'tsyringe';

import Note from '@modules/Notes/infra/typeorm/entities/Notes';
import INotesRepository from '@modules/Notes/repositories/INotesRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowNotesByTag {
    constructor(
        @inject('NotesRepository') private notesRepository: INotesRepository,
    ) {}

    public async execute(tags: string[], userId: string): Promise<Note[]> {
        const notes = await this.notesRepository.findByTags(tags, userId);

        if (!notes) {
            throw new AppError("Tags doesn't have any notes");
        }

        notes.forEach(note => {
            note.content = JSON.parse(note.content); //eslint-disable-line
        });

        return notes;
    }
}

export default ShowNotesByTag;
