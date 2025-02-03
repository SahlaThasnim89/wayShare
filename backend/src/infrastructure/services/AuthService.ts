import { generateToken } from '../../shared/utils/tokenUtils';
import { IUser } from '../../domain/entities/User';
import { environment } from '../../config/environment';
import jwt from 'jsonwebtoken' 
import { Response } from 'express';
import User from '../database/mongoose/UserModel';
import { passwordHashingService } from '../../shared/utils/hashUtils';


export class AuthService{
    private passwordService=new passwordHashingService()
    generateToken(res:Response,user:IUser):string{
        return generateToken(res,user)
    }

    verifyToken(token:string):IUser|null{
        try {
            const decoded=jwt.verify(token,environment.jwtSecret||'secret')
            return decoded as IUser
        } catch (error) {
            return null;
        }
    }

    async login(email:string,password:string):Promise<IUser|string>{
        const user=await User.findOne({email})
        if (!user) {
            return 'Email not found';
        }
        const isPasswordMatch = await this.passwordService.comparePassword(password,user.password);
        if (!isPasswordMatch) {
            return 'Incorrect password';
          }
      
          return user;
    }

    logout(res:Response):void{
        res.cookie('jwt','',{
            httpOnly:true,
            expires:new Date(0)
        })
    }

}