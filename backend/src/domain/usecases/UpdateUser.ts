import { IUserRepository } from './../repositories/UserRepository';
import { IUser } from '../entities/User';
import {passwordHashingService} from '../../shared/utils/hashUtils'

export class UpdateUser{
    private hash: passwordHashingService;

    constructor(private userRepository:IUserRepository){
        this.hash=new passwordHashingService()
    }

    async execute (userId:string,userData:Partial<IUser>):Promise<IUser|null>{
        const user=await this.userRepository.findById(userId)

        if(!user){
            throw new Error('User not found')
        }

        if (userData.password) {
            userData.password = await this.hash.hashPassword(userData.password);
          }

        Object.assign(user,userData)
        return await this.userRepository.update(userId,userData)
    }
}
