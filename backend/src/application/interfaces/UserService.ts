import {IUser} from '../../domain/entities/User'

export interface IUserService{
    registerUser(name:string, email:string, password:string, mobile:string,isBlocked:boolean):Promise<IUser>
    getAllUsers(): Promise<IUser[]>;
}