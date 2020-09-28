import Tag from '@modules/Tags/infra/typeorm/entities/Tag';

export default interface INoteCreationDTO {
    title: string;
    content: string;
    userId: string;
    isLink?: boolean;
    tagsNames?: string[];
    tags?: Tag[];
}
