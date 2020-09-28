import { injectable, inject } from 'tsyringe';

import Note from '@modules/Notes/infra/typeorm/entities/Notes';
import AppError from '@shared/errors/AppError';
import ITagsRepository from '@modules/Tags/repositories/ITagsRepository';
import INotesRepository from '../repositories/INotesRepository';
import INoteCreationDTO from '../dtos/INoteCreationDTO';

@injectable()
class CreateNoteService {
    constructor(
        @inject('NotesRepository') private notesRepository: INotesRepository,
        @inject('TagsRepository') private tagsRepository: ITagsRepository,
    ) {}

    public async execute({
        title,
        content,
        tagsNames,
        userId,
        isLink,
    }: INoteCreationDTO): Promise<Note> {
        if (!tagsNames) {
            const note = await this.notesRepository.create({
                title,
                content,
                isLink,
                userId,
            });

            return note;
        }
        const tags = await this.tagsRepository.findTagsByName(
            tagsNames,
            userId,
        );

        if (!tags) {
            throw new AppError('Inexistents provided tags');
        }

        const note = await this.notesRepository.create({
            title,
            content,
            isLink,
            userId,
            tags,
        });

        return note;
    }
}

export default CreateNoteService;
