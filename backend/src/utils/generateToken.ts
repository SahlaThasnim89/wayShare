import jwt from 'jsonwebtoken'
import { environment } from "../config/environment";
import { IUser } from '../domain/entities/User;


export const generateToken=(user:IUser):string=>{
    const payload={
        id:user._id,
        name:user.name,
        email:user.email
    }
    return jwt.sign(payload,environment.jwtSecret||'secret')
}

