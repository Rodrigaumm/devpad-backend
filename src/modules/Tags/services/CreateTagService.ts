import { inject, injectable } from 'tsyringe';

import ITagsRepository from '@modules/Tags/repositories/ITagsRepository';
import ITagCreationDTO from '@modules/Tags/dtos/ITagCreationDTO';
import Tag from '@modules/Tags/infra/typeorm/entities/Tag';

@injectable()
class CreateTagService {
    constructor(
        @inject('TagsRepository') private tagsRepository: ITagsRepository,
    ) {}

    public async execute({
        color,
        name,
        userId,
    }: ITagCreationDTO): Promise<Tag> {
        const tag = await this.tagsRepository.create({
            color,
            name,
            userId,
        });

        return tag;
    }
}

export default CreateTagService;
