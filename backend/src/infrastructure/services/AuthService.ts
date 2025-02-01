import { generateToken } from '../../shared/utils/tokenUtils';
import { IUser } from '../../domain/entities/User';
import { environment } from '../../config/environment';
import jwt from 'jsonwebtoken' 
import { Response } from 'express';

export class AuthService{
    generateToken(user:IUser):string{
        return generateToken(user)
    }

    verifyToken(token:string):IUser|null{
        try {
            const decoded=jwt.verify(token,environment.jwtSecret||'secret')
            return decoded as IUser
        } catch (error) {
            return null;
        }
    }

    logout(res:Response):void{
        res.cookie('jwt','',{
            httpOnly:true,
            expires:new Date(0)
        })
    }

}