import {IUser} from '../../../domain/entities/User'
import User from './UserModel';
import {IUserRepository} from '../../../domain/repositories/UserRepository'


export class UserRepositoryImpl implements IUserRepository{
    async findOneByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email });
    }


    async create(userData: Partial<IUser>): Promise<IUser> {
            const user=new User(userData)
            await user.save();
            return user;
    }

    async findById(userId: string): Promise<Partial<IUser> | null> {
        return await User.findById(userId).select("name email image isBlocked createdAt").lean()
    }
}