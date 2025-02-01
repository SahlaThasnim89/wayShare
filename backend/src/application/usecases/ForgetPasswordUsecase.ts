// import { UserServiceImpl } from "../services/UserServiceImpl";
// import redis from "../../infrastructure/services/RedisService";
// import { AuthService } from './../../infrastructure/services/AuthService';
// import crypto from 'crypto';
// import { sendResetPasswordEmail } from "../../infrastructure/services/EmailService";



// export class ForgotPasswordUseCase{
//     private userService:UserServiceImpl;
//     private authService:AuthService;

//     constructor(){
//         this.userService=new UserServiceImpl()
//         this.authService=new AuthService()
//     }


//     async execute(email:string):Promise<void>{
//         const user=await this.userService.findByEmail(email)
//         if(!user){
//             throw new Error("user not found")
//         }

//         const resetToken=crypto.randomBytes(32).toString("hex")
//         await redis.setex(`reset:${email}`,600,resetToken)

//         const resetLink=`http://localhost:5173/reset-password?token=${resetToken}&email=${email}`;
//         await sendResetPasswordEmail(email,resetLink)
//     }
// }