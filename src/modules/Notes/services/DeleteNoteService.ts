import { injectable, inject } from 'tsyringe';

import INotesRepository from '../repositories/INotesRepository';

@injectable()
class CreateNoteService {
    constructor(
        @inject('NotesRepository') private notesRepository: INotesRepository,
    ) {}

    public async execute(noteId: string, userId: string): Promise<void> {
        await this.notesRepository.destroy(noteId, userId);
    }
}

export default CreateNoteService;
