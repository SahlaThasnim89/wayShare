import { IUserRepository } from './../../domain/repositories/UserRepository';
import { IUser } from './../../domain/entities/User';


export class BlockUser{
    constructor(private UserRepository:IUserRepository){}

    async execute (userId:string,isBlocked:boolean):Promise<Partial<IUser> | null>{
        const user=await this.UserRepository.findById(userId);
        if(!user)throw new Error('User not found')

            user.isBlocked = !user.isBlocked;
            return await this.UserRepository.update(userId,user);
    }
}