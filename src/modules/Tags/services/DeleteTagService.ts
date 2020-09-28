import { inject, injectable } from 'tsyringe';

import ITagsRepository from '@modules/Tags/repositories/ITagsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteTagService {
    constructor(
        @inject('TagsRepository') private tagsRepository: ITagsRepository,
    ) {}

    public async execute(tagId: string, userId: string): Promise<void> {
        const tag = await this.tagsRepository.findOne(tagId, userId);

        if (!tag) {
            throw new AppError("provided tag doesn't exist");
        }

        await this.tagsRepository.destroy(tagId, userId);
    }
}

export default DeleteTagService;
