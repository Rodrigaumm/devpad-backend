import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

import Note from '@modules/Notes/infra/typeorm/entities/Notes';
import Tag from '@modules/Tags/infra/typeorm/entities/Tag';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(type => Note, note => note.user)
    notes: Note[];

    @OneToMany(type => Tag, tag => tag.user)
    tags: Tag[];
}

export default User;
