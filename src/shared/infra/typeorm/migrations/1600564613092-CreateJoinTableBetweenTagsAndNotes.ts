import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateJoinTableBetweenTagsAndNotes1600564613092
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tag_notes_note',
                columns: [
                    {
                        name: 'tagId',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'noteId',
                        type: 'uuid',
                        isPrimary: true,
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'tag_notes_note',
            new TableForeignKey({
                name: 'TagId',
                referencedTableName: 'tags',
                referencedColumnNames: ['id'],
                columnNames: ['tagId'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'tag_notes_note',
            new TableForeignKey({
                name: 'NoteId',
                referencedTableName: 'notes',
                referencedColumnNames: ['id'],
                columnNames: ['noteId'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tag_notes_note', 'TagId');
        await queryRunner.dropForeignKey('tag_notes_note', 'NoteId');

        await queryRunner.dropTable('tag_notes_note');
    }
}
