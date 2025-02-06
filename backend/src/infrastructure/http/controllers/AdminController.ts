import { AdminAuthService } from "../../../application/services/AdminAuthService"
import { generateToken } from "../../../shared/utils/tokenUtils";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";



const authAdmin=asyncHandler(async(req:Request,res:Response):Promise<any>=>{
    const {email,password}=req.body

    if(AdminAuthService.authenticate(email,password)){
        const adminUser={
            _id: "admin123",
            name: "Admin",
            email,
          };

          generateToken(res,adminUser._id as string)

          res.status(200).json(adminUser)
    }else{
        res.status(401);
        throw new Error("Invalid email or password");
      }
})

const logoutAdmin=asyncHandler(async(req:Request,res:Response)=>{
    AdminAuthService.logout(res)
    res.status(200).json({message:"Logged out successfully"})
})


// const getUsers=asyncHandler(async(req:Request,res:Response)=>{
//     const users = await UserService.getAllUsers();
//     res.status(200).json(users);
// })

export {authAdmin,logoutAdmin};