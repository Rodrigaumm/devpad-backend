import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import Note from '@modules/Notes/infra/typeorm/entities/Notes';
import User from '@modules/Users/infra/typeorm/entities/Users';

@Entity('tags')
class Tag {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    color: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column('uuid')
    userId: string;

    @ManyToOne(type => User, user => user.tags)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToMany(type => Note, note => note.tags)
    @JoinTable({
        name: 'tag_notes_note',
        joinColumn: {
            name: 'tagId',
        },
        inverseJoinColumn: {
            name: 'noteId',
        },
    })
    notes: Note[];
}

export default Tag;
