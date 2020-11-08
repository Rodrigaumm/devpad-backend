import { getRepository, In, Repository } from 'typeorm';

import ITagsRepository from '@modules/Tags/repositories/ITagsRepository';
import Tag from '@modules/Tags/infra/typeorm/entities/Tag';
import ITagCreationDTO from '@modules/Tags/dtos/ITagCreationDTO';
import ITagEditDTO from '@modules/Tags/dtos/ITagEditDTO';
import AppError from '@shared/errors/AppError';

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

    public async update(
        tagId: string,
        userId: string,
        newData: ITagEditDTO,
    ): Promise<Tag | undefined> {
        const tag = await this.ormRepository.findOne({
            where: {
                id: tagId,
                userId,
            },
        });

        if (!tag) {
            return tag;
        }

        if (newData.name) {
            tag.name = newData.name;
        }

        if (newData.color) {
            tag.color = newData.color;
        }

        await this.ormRepository.save(tag);

        return tag;
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
