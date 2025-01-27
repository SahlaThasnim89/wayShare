import {Request,Response} from 'express'
import { UserServiceImpl } from '../../../application/services/UserServiceImpl'; 
import { AuthService } from '../../services/AuthService'

export const registerUser=async(req:Request,res:Response)=>{
    try {
        // console.log(req.body,'uiu')
        const { name, email, password, mobile } = req.body;
        const userService=new UserServiceImpl()
        const user=await userService.registerUser( name, email, password, mobile)
        console.log(user,'userService')
        const authService=new AuthService()
        const token =authService.generateToken(user)


        res.status(201).json({
            message: 'User registered successfully!',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        })
    } catch (error:any) {
        res.status(400).json({ message: error.message });
    }
}