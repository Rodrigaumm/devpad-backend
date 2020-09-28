import Tag from '@modules/Tags/infra/typeorm/entities/Tag';
import ITagCreationDTO from '@modules/Tags/dtos/ITagCreationDTO';

export default interface ITagsRepository {
    create(data: ITagCreationDTO): Promise<Tag>;
    destroy(tagId: string, userId: string): Promise<void>;
    list(userId: string): Promise<Tag[]>;
    findOne(tagId: string, userId: string): Promise<Tag | undefined>;
    findTagsByName(
        tagsNames: string[],
        userId: string,
    ): Promise<Tag[] | undefined>;
}
