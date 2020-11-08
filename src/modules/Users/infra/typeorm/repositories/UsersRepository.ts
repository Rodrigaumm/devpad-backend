import { getRepository, Repository } from 'typeorm';

import IUserRepository from '@modules/Users/repositories/IUsersRepository';
import IUserCreationDTO from '@modules/Users/dtos/IUserCreationDTO';
import User from '../entities/Users';

export default class UsersRepository implements IUserRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: {
                email,
            },
        });

        return user;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);

        return user;
    }

    public async create({
        username,
        email,
        password,
    }: IUserCreationDTO): Promise<User> {
        const user = await this.ormRepository.create({
            username,
            email,
            password,
        });

        await this.ormRepository.save(user);

        return user;
    }
}
