import { IUserRepository } from './../repositories/UserRepository';
import {GoogleAuthService} from '../../infrastructure/services/GoogleAuthService'
import {IUser} from '../entities/User'


export class GoogleAuthUseCase{
    constructor(
        private UserRepository:IUserRepository,
        private googleAuthService:GoogleAuthService
    ){}

    async execute(token:string):Promise<IUser>{
        const googleUser=await this.googleAuthService.verifyToken(token)


        if (!googleUser.googleId || !googleUser.email) {
            throw new Error("Invalid Google Token");
        }
        
        let user = await this.UserRepository.findOneByGoogleId(googleUser.googleId);

        if(!user){
            console.log('uiui')
            user=await this.UserRepository.create({
                googleId:googleUser.googleId,
                name: googleUser.name,
                email: googleUser.email,
            })
            console.log(user,'iuoiuou')
        }

        // if (!user) {  
        //     throw new Error("Failed to create user");
        // }
        console.log(user,'iiiiiiiii')
        return user
    } 
}
