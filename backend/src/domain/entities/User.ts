import {Document} from 'mongoose'

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    mobile: string;
    isBlocked: boolean;
    // image:string;
    matchPassword: (password: string) => Promise<boolean>;
    // matchPassword?:(password:string)=>Promise<boolean>;
}