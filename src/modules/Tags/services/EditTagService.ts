import { injectable, inject } from 'tsyringe';

import Tag from '@modules/Tags/infra/typeorm/entities/Tag';
import ITagsRepository from '@modules/Tags/repositories/ITagsRepository';
import ITagEditDTO from '@modules/Tags/dtos/ITagEditDTO';
import AppError from '@shared/errors/AppError';

@injectable()
class EditTagService {
    constructor(
        @inject('TagsRepository')
        private tagsRepository: ITagsRepository,
    ) {}

    public async execute(
        tagId: string,
        userId: string,
        tagData: ITagEditDTO,
    ): Promise<Tag> {
        const tag = await this.tagsRepository.update(tagId, userId, tagData);

        if (!tag) {
            throw new AppError('Inexistent tag');
        }

        return tag;
    }
}

export default EditTagService;
