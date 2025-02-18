import { Request, Response } from "express";
import { UserServiceImpl } from "../../../application/services/UserServiceImpl";
import { AuthService } from "../../services/AuthService";
import { saveOTP, verifyOTP } from "../../services/otpService";
import { sendOTPEmail } from "../../services/EmailService";
import redis from "../../services/RedisService";
import { resendOtpUseCase } from "../../../application/usecases/ResendOTP";
import { generateOtp } from "../../../shared/utils/otpUtils";
import { UserRepositoryImpl } from "../../database/mongoose/UserRepositoryImpl";
import { ForgotPasswordUseCase } from "../../../application/usecases/ForgetPasswordUsecase";
import { ResetPasswordUseCase } from "../../../application/usecases/ResetPasswordUseCase";
import asyncHandler from 'express-async-handler';




const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
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
    const token = authService.generateToken(res,newUser);

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
    // console.log(req.body,'yyyyy')
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const otp=generateOtp()
    console.log(otp,'resend')
    const storedData=await redis.get(`otp:${email}`)

    let userData = null;
    if(storedData){
      const parsedData=JSON.parse(storedData)
      userData=parsedData.userData
    }

    const newOtpData=JSON.stringify({otp,userData})
    await redis.setex(`otp:${email}`,120,newOtpData)

    await sendOTPEmail(email, otp);
    res.json({ message: "OTP resent successfully" });


    // const ResendOtpUseCase = new resendOtpUseCase();
    // await ResendOtpUseCase.execute(email);

    // res.json({ message: "OTP resent successfully" });

  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
}



const loginUser=async(req:Request,res:Response):Promise<any>=>{
  try {
    console.log(req.body)
    const {email,password}=req.body
    const authService = new AuthService();

    const user=await authService.login(email,password)
    console.log(user)
    if (typeof user === 'string') {
      console.log(user,'klk')
      return res.status(400).json({ message: user });
    }else{
      authService.generateToken(res,user)
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isBlocked: user.isBlocked,
      });
    }
  } catch (error:any) {
    return res.status(500).json({ message: error.message });

  }
}


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




const userRepository=new UserRepositoryImpl()
const userService=new UserServiceImpl(userRepository)

const getUserProfile=asyncHandler(async(req:any,res:Response)=>{
  try {
    const userId = req.user; 
    const userProfile=await userService.getUserProfile(userId._id)
    res.status(200).json(userProfile);

  } catch (error:any) {
    res.status(404).json({ message: error.message });
  }
})


const updateUserProfile=async(req:any,res:Response):Promise<any>=>{
  try {
    console.log(req.body,'ryieryiey')
    const {name,email,mobile,
      image,currentPassword,password
    }=req.body
    const user=req.user._id
    // console.log(user)
    const updatedUser=await userService.updateUserProfile(user,{
      name,
      mobile,
      image,
      password,
      currentPassword
    })
    console.log(updatedUser,'currentPassword')

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      mobile:updatedUser.mobile,
      image: updatedUser.image,
    })
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
}




const forgotPassword=async(req:Request,res:Response):Promise<void>=>{
  try {
    const {email}=req.body
    if(!email){
      res.status(400).json({message:"Email is required"})
      return;
    }
    const forgotPasswordUseCase=new ForgotPasswordUseCase()
    await forgotPasswordUseCase.execute(email)
    res.json({message:'an email has sent to your  mail'})
  } catch (error:any) {
    res.status(500).json({message:error.message})
  }
}


const resetPassword=async(req:Request,res:Response):Promise<void>=>{
  try {
    console.log('uyiuyi')
    console.log(req.body,'ytyutu')
    const {email,token,password}=req.body
    if (!email || !token || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    const resetPasswordUseCase=new ResetPasswordUseCase();
    // console.log(resetPasswordUseCase,'resetPasswordUseCase')
    await resetPasswordUseCase.execute(email,token,password)
    res.json({ message: "Password reset successful" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}








export { verifyUserOTP,registerUser,logoutUser ,resendOTP,loginUser,getUserProfile,updateUserProfile,
  forgotPassword,
  resetPassword,
};