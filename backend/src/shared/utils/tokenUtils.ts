import jwt from 'jsonwebtoken'
import { environment } from '../../config/environment';
import { IUser } from '../../domain/entities/User';
import { Response } from 'express';


export const generateToken=(res:Response,user:IUser):string=>{
    const payload={
        id:user._id,
        name:user.name,
        email:user.email
    }
    const token = jwt.sign(payload, environment.jwtSecret || 'secret', {
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
