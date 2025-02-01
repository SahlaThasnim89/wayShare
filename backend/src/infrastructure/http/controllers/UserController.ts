import { Request, Response } from "express";
import { UserServiceImpl } from "../../../application/services/UserServiceImpl";
import { AuthService } from "../../services/AuthService";
import { saveOTP, verifyOTP } from "../../services/otpService";
import { sendOTPEmail } from "../../services/EmailService";
import redis from "../../services/RedisService";
import { resendOtpUseCase } from "../../../application/usecases/ResendOTP";
// import { ForgotPasswordUseCase } from "../../../application/usecases/ForgetPasswordUsecase";
// import { ResetPasswordUseCase } from "../../../application/usecases/ResetPasswordUseCase";




const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log(req.body)
    const { name, email, password, mobile } = req.body;
    const otp = await saveOTP(email, { name, mobile, password, email });
    await sendOTPEmail(email, otp);
    res.json({ message: "OTP sent to email" });
    return;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};




const verifyUserOTP = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, otp } = req.body;
  const { isValid, storedData } = await verifyOTP(email, otp);
  if (!isValid) {
    res.status(400).json({ message: "Invalid or expired OTP" });
    return;
  }

  console.log(storedData, "User Data from Redis");
  try {
    if (!storedData) {
      return res.status(400).json({ message: "No user data found in OTP storage" });
   
    }

    const { name, mobile, password } = storedData;

    const userService = new UserServiceImpl();
    if(!userService){
      return res.status(409).json({ message: "User already exists" });
    }
    const newUser = await userService.registerUser(
      name,
      email,
      password,
      mobile
    );

    const authService = new AuthService();
    const token = authService.generateToken(newUser);

    await redis.del(`otp:${email}`);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        mobile: newUser.mobile,
      },
      token,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};



const resendOTP=async(req:Request,res:Response):Promise<void>=>{
  try {
    console.log(req.body,'yyyyy')
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const ResendOtpUseCase = new resendOtpUseCase();
    await ResendOtpUseCase.execute(email);

    res.json({ message: "OTP resent successfully" });

  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
}



// const forgotPassword=async(req:Request,res:Response):Promise<void>=>{
//   try {
//     const {email}=req.body
//     if(!email){
//       res.status(400).json({message:"Email is required"})
//       return;
//     }
//     const forgotPasswordUseCase=new ForgotPasswordUseCase()
//     await forgotPasswordUseCase.execute(email)
//     res.json({message:'an email has sent to your  mail'})
//   } catch (error:any) {
//     res.status(500).json({message:error.message})
//   }
// }


// const resetPassword=async(req:Request,res:Response):Promise<void>=>{
//   try {
//     const {email,token,newPassword}=req.body
//     if (!email || !token || !newPassword) {
//       res.status(400).json({ message: "All fields are required" });
//       return;
//     }
//     const resetPasswordUseCase=new ResetPasswordUseCase();
//     await resetPasswordUseCase.execute(email,token,newPassword)
//     res.json({ message: "Password reset successful" });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// }



const logoutUser=async(req:Request,res:Response)=>{
    try {
        res.cookie('jwt','',{
            httpOnly:true,
            expires:new Date(0)
        })
        res.status(200).json({message:'User logged out successfully'})
    } catch (error) {
        res.status(400);
        throw new Error('Failed to logout');
    }
}




export { verifyUserOTP,registerUser,logoutUser ,resendOTP,
  // forgotPassword,
  // resetPassword,
};