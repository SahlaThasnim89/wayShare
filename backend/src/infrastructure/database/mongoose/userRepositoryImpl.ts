import {IUser} from '../../../domain/entities/User'
import User from './UserModel';
import {IUserRepository} from '../../../domain/repositories/userRepository'


export class UserRepositoryImpl implements IUserRepository{
    async findOneByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email });
    }


    async create(userData: IUser): Promise<IUser> {
            const user=new User(userData)
            await user.save();
            return user;
}
}