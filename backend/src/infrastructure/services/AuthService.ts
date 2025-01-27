import { generateToken } from './../../utils/generateToken';
import {IUser} from '../../domain/entities/User'
import { environment } from '../../config/environment';

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

}