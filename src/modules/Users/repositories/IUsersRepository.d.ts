import User from '@modules/Users/infra/typeorm/entities/Users';
import IUserCreationDTO from '@modules/Users/dtos/IUserCreationDTO';

export default interface IUserRepository {
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(data: IUserCreationDTO): Promise<User>;
}
