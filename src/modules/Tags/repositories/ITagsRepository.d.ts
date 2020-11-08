import Tag from '@modules/Tags/infra/typeorm/entities/Tag';
import ITagCreationDTO from '@modules/Tags/dtos/ITagCreationDTO';
import ITagEditDTO from '@modules/Tags/dtos/ITagEditDTO';

export default interface ITagsRepository {
    create(data: ITagCreationDTO): Promise<Tag>;
    destroy(tagId: string, userId: string): Promise<void>;
    list(userId: string): Promise<Tag[]>;
    update(
        tagId: string,
        userId: string,
        newData: ITagEditDTO,
    ): Promise<Tag | undefined>;
    findOne(tagId: string, userId: string): Promise<Tag | undefined>;
    findTagsByName(
        tagsNames: string[],
        userId: string,
    ): Promise<Tag[] | undefined>;
}
