import { container } from 'tsyringe';

import NotesRepoistory from '@modules/Notes/infra/typeorm/repositories/NotesRepository';
import UsersRepository from '@modules/Users/infra/typeorm/repositories/UsersRepository';
import TagsRepository from '@modules/Tags/infra/typeorm/repositories/TagsRepository';

import INotesRepository from '@modules/Notes/repositories/INotesRepository';
import IUsersRepository from '@modules/Users/repositories/IUsersRepository';
import ITagsRepository from '@modules/Tags/repositories/ITagsRepository';

container.registerSingleton<INotesRepository>(
    'NotesRepository',
    NotesRepoistory,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<ITagsRepository>('TagsRepository', TagsRepository);
