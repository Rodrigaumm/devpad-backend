import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    ManyToMany,
} from 'typeorm';

import User from '@modules/Users/infra/typeorm/entities/Users';
import Tag from '@modules/Tags/infra/typeorm/entities/Tag';

@Entity('notes')
class Note {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column('boolean')
    isLink: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column('uuid')
    userId: string;

    @ManyToOne(type => User, user => user.notes)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToMany(type => Tag, tag => tag.notes)
    tags: Tag[];
}

export default Note;
