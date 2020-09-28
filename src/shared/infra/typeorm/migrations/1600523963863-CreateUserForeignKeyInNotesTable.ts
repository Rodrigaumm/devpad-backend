import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export class CreateUserForeignKeyInNotesTable1600523963863
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'notes',
            new TableColumn({
                name: 'userId',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'notes',
            new TableForeignKey({
                name: 'NoteUser',
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                columnNames: ['userId'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('notes', 'NoteUser');
        await queryRunner.dropColumn('notes', 'userId');
    }
}
