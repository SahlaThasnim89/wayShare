import jwt from 'jsonwebtoken'
import { environment } from '../../config/environment';
import { IUser } from '../../domain/entities/User';
import { Response } from 'express';


export const generateToken=(res:Response,user:IUser|any):any=>{
    console.log(user,'user')
    console.log(user.name,'user')
    console.log(user._id,'user')
    console.log(user.email,'user')
    const secretKey  = environment.jwtSecret;
    const payload={
        id:user._id,
        name:user.name,
        email:user.email
    }
    console.log(payload,'uyguuyuyui')
    const token = jwt.sign(payload, secretKey, {
        expiresIn: '30d'
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: environment.nodeEnv !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 
    });
    return token;
}
