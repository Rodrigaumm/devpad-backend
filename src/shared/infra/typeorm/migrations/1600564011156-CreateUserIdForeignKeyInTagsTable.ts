import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export class CreateUserIdForeignKeyInTagsTable1600564011156
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'tags',
            new TableColumn({
                name: 'userId',
                type: 'uuid',
                isNullable: false,
            }),
        );

        await queryRunner.createForeignKey(
            'tags',
            new TableForeignKey({
                name: 'TagUser',
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                columnNames: ['userId'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tags', 'TagUser');

        await queryRunner.dropColumn('tags', 'userId');
    }
}
