import mongoose,{Schema,} from 'mongoose'
import {IUser} from '../../../domain/entities/User'


const userSchema=new Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String, 
        required: true, 
        unique: true
    },
    password: { 
        type: String, 
        required: true 
    },
    mobile:{
        type: String, 
        required: true  
    },
    // image:{
    //     type:String
    // },
    isBlocked:{
        type: Boolean, 
        default: false,
        required: true  
    }
},{
        timestamps:true,
    }
)

const User=mongoose.model<IUser>('User',userSchema)
export default User;