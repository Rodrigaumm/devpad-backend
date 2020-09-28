import Tag from '@modules/Tags/infra/typeorm/entities/Tag';

export default interface INoteEditDTO {
    noteId: string;
    userId: string;
    title?: string;
    content?: string;
    isLink?: boolean;
    tags?: string[];
    newTags?: Tag[];
}
