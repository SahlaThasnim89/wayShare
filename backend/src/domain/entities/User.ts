import {Document} from 'mongoose'

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    mobile: string;
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}