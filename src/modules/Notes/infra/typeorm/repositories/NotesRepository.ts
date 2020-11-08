import { getRepository, Repository } from 'typeorm';

import INotesRepository from '@modules/Notes/repositories/INotesRepository';
import AppError from '@shared/errors/AppError';
import INoteCreationDTO from '@modules/Notes/dtos/INoteCreationDTO';
import INoteEditDTO from '@modules/Notes/dtos/INoteEditDTO';
import Note from '../entities/Notes';

export default class NotesRepository implements INotesRepository {
    private ormRepository: Repository<Note>;

    constructor() {
        this.ormRepository = getRepository<Note>(Note);
    }

    public async create({
        title,
        content,
        tags,
        isLink,
        userId,
    }: INoteCreationDTO): Promise<Note> {
        const noteAlreadyExists = await this.ormRepository.findOne({
            where: { title, content, userId },
        });

        if (noteAlreadyExists) {
            throw new AppError('note already exists');
        }

        const note = this.ormRepository.create({
            title,
            content,
            tags,
            isLink,
            userId,
        });

        await this.ormRepository.save(note);

        return note;
    }

    public async destroy(noteId: string, userId: string): Promise<void> {
        const noteDoesntExists = await this.ormRepository.findOne({
            where: {
                id: noteId,
                userId,
            },
        });

        if (!noteDoesntExists) {
            throw new AppError("note doensn't exist");
        }

        await this.ormRepository.delete({
            id: noteId,
            userId,
        });
    }

    public async update({
        noteId: id,
        userId,
        title,
        isLink,
        content,
        newTags,
    }: INoteEditDTO): Promise<Note | undefined> {
        const note = await this.ormRepository.findOne({
            where: {
                id,
                userId,
            },
            relations: ['tags'],
        });

        if (!note) {
            return undefined;
        }

        Object.assign(note, {
            title,
            content,
            isLink,
            tags: newTags,
        });

        if (newTags && newTags.length === 0 && note.tags) {
            note.tags = [];
        }

        note.updatedAt = new Date();

        await this.ormRepository.save(note);

        return note;
    }

    public async findOne(
        id: string,
        userId: string,
    ): Promise<Note | undefined> {
        const noteInfo = await this.ormRepository.findOne({
            where: {
                id,
                userId,
            },
            relations: ['tags'],
        });

        return noteInfo;
    }

    public async findAll(userId: string): Promise<Note[]> {
        const notes = await this.ormRepository.find({
            where: {
                userId,
            },
            relations: ['tags'],
            order: {
                createdAt: 'DESC',
            },
        });

        return notes;
    }
}
