import INoteEditDTO from '@modules/Notes/dtos/INoteEditDTO';
import Note from '@modules/Notes/infra/typeorm/entities/Notes';
import ITagsRepository from '@modules/Tags/repositories/ITagsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import INotesRepository from '../repositories/INotesRepository';

@injectable()
class EditNoteContentService {
    constructor(
        @inject('NotesRepository') private notesRepository: INotesRepository,
        @inject('TagsRepository') private tagsRepository: ITagsRepository,
    ) {}

    public async execute(data: INoteEditDTO): Promise<Note> {
        if (!data.tags) {
            const newNote = await this.notesRepository.update(data);
            if (!newNote) {
                throw new AppError('requested note not found');
            }

            return newNote;
        }

        if (data.tags.length === 0) {
            data.newTags = []; //eslint-disable-line
            const newNote = await this.notesRepository.update(data);
            if (!newNote) {
                throw new AppError('requested note not found');
            }

            return newNote;
        }

        const tags = await this.tagsRepository.findTagsByName(
            data.tags,
            data.userId,
        );

        if (!tags) {
            throw new AppError('provided tags not found');
        }

        data.newTags = tags; //eslint-disable-line

        const newNote = await this.notesRepository.update(data);

        if (!newNote) {
            throw new AppError('requested note not found');
        }

        return newNote;
    }
}

export default EditNoteContentService;
