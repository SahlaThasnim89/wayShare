import { IUserRepository } from './../repositories/UserRepository';
import { IUser } from '../entities/User';
import {passwordHashingService} from '../../shared/utils/hashUtils'

export class UpdateUser{
    private hash: passwordHashingService;
    private compare:passwordHashingService;

    constructor(private userRepository:IUserRepository){
        this.hash=new passwordHashingService()
        this.compare=new passwordHashingService()
    }

    async execute (userId:string,userData:Partial<IUser>):Promise<IUser|null>{
        const user=await this.userRepository.findById(userId)

        if(!user){
            throw new Error('User not found')
        }


        console.log(user.password,'userData.current')
        console.log(userData.currentPassword,'userData.current')

        

        if(userData.currentPassword && userData.password){
            const isPasswordMatch = await this.compare.comparePassword(userData.currentPassword,user.password as string);
            console.log(isPasswordMatch,'isPasswordMatch')
            if (!isPasswordMatch) {
                throw new Error('Incorrect current password');
            }
            userData.password = await this.hash.hashPassword(userData.currentPassword);
        }


        if (userData.password) {
            userData.password = await this.hash.hashPassword(userData.password);
          }

        Object.assign(user,userData)
        return await this.userRepository.update(userId,userData)
    }
}
