import {IUser} from '../domain/entities/User'

export interface IUserService{
    registerUser(name:string, email:string, password:string, mobile:string):Promise<IUser>
}