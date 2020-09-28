import { getRepository, In, Repository } from 'typeorm';

import ITagsRepository from '@modules/Tags/repositories/ITagsRepository';
import Tag from '@modules/Tags/infra/typeorm/entities/Tag';
import ITagCreationDTO from '@modules/Tags/dtos/ITagCreationDTO';
import AppError from '@shared/errors/AppError';
import Note from '@modules/Notes/infra/typeorm/entities/Notes';

interface INotesReduce {
    [key: string]: number;
}

class TagsRepository implements ITagsRepository {
    private ormRepository: Repository<Tag>;

    constructor() {
        this.ormRepository = getRepository(Tag);
    }

    public async create({
        name,
        color,
        userId,
    }: ITagCreationDTO): Promise<Tag> {
        const tagAlreadyExists = await this.ormRepository.findOne({
            where: {
                name,
                color,
                userId,
            },
        });

        if (tagAlreadyExists) {
            throw new AppError('tag already exists');
        }

        const tag = await this.ormRepository.create({
            name,
            color,
            userId,
        });

        await this.ormRepository.save(tag);

        return tag;
    }

    public async destroy(tagId: string, userId: string): Promise<void> {
        await this.ormRepository.delete({
            id: tagId,
            userId,
        });
    }

    public async list(userId: string): Promise<Tag[]> {
        const tags = await this.ormRepository.find({
            where: {
                userId,
            },
            order: {
                createdAt: 'ASC',
            },
        });

        return tags;
    }

    public async findOne(
        tagId: string,
        userId: string,
    ): Promise<Tag | undefined> {
        const tag = await this.ormRepository.findOne({
            where: {
                id: tagId,
                userId,
            },
        });

        return tag;
    }

    public async findTagsByName(
        tagsNames: string[],
        userId: string,
    ): Promise<Tag[] | undefined> {
        const tags = await this.ormRepository.find({
            where: {
                name: In(tagsNames),
                userId,
            },
        });

        return tags;
    }
}

export default TagsRepository;
