import { inject, injectable } from 'tsyringe';

import ITagsRepository from '@modules/Tags/repositories/ITagsRepository';
import ITagCreationDTO from '@modules/Tags/dtos/ITagCreationDTO';
import Tag from '@modules/Tags/infra/typeorm/entities/Tag';

@injectable()
class CreateTagService {
    constructor(
        @inject('TagsRepository') private tagsRepository: ITagsRepository,
    ) {}

    public async execute(userId: string): Promise<Tag[]> {
        const tags = await this.tagsRepository.list(userId);
        return tags;
    }
}

export default CreateTagService;
