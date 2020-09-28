import INoteCreationDTO from '@modules/Notes/dtos/INoteCreationDTO';
import Note from '@modules/Notes/infra/typeorm/entities/Notes';
import INoteEditDTO from '../dtos/INoteEditDTO';

export default interface INotesRepository {
    create(data: INoteCreationDTO): Promise<Note>;
    destroy(noteId: string, userId: string): Promise<void>;
    update(data: INoteEditDTO): Promise<Note | undefined>;
    findOne(noteId: string, userId: string): Promise<Note | undefined>;
    findAll(userId: string): Promise<Note[]>;
    findByTags(tags: string[], userId: string): Promise<Note[]>;
}
