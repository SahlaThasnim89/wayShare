
import {IUser} from '../entities/User'

export interface IUserRepository {
    findOneByEmail(email: string): Promise<IUser | null>;
    create(userData: IUser): Promise<IUser>;
}



