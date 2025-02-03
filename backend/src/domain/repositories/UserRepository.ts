
import {IUser} from '../entities/User'

export interface IUserRepository {
    findOneByEmail(email: string): Promise<IUser | null>;
    create(userData: Partial<IUser>): Promise<IUser>;
    findById(userId:string):Promise<Partial<IUser> | null>
}


