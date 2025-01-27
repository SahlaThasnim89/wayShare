import { Request,Response } from "express";
import { UserService } from "../application/services/userService";
import { UserRepositoryImpl } from "../infrastructure/database/mongoose/userRepositoryImpl";

const userRepository=new UserRepositoryImpl()
const userService=new UserService(userRepository)

export const registerUser=async(req:Request,res:Response)=>{
    try{
        const {name,email,mobile,password}=req.body
        const user=await userService.registerUser(name,email,mobile,password)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            mobile:user.mobile
        })
    }catch(error:unknown){
        res.status(400).json({ message: error.message });
    }
}