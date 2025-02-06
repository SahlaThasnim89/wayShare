import {IUser} from '../../../domain/entities/User'
import User from './UserModel';
import {IUserRepository} from '../../../domain/repositories/UserRepository'


export class UserRepositoryImpl implements IUserRepository{
    async findOneByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email });
    }


    async create(userData: Partial<IUser>): Promise<IUser> {
        console.log("Creating User with", userData);
            const user=new User(userData)
            console.log("User Created ", user);
            await user.save();
            return user;
    }

    async findById(userId: string): Promise<Partial<IUser> | null> {
        return await User.findById(userId).select("name email image isBlocked createdAt").lean()
    }

    async update(userId:string,userData:Partial<IUser>):Promise<IUser|null>{
        const updatedUser=await User.findByIdAndUpdate(userId, userData, { new: true })

        return updatedUser;
    }

    async findOneByGoogleId(googleId: string): Promise<IUser | null> {
        console.log("Looking for user with Google ID:", googleId);
        return User.findOne({ googleId }).lean();
    }
}