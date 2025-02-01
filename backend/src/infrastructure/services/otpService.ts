import redis from "../services/RedisService";
import { generateOtp } from "../../shared/utils/otpUtils";
import { sendOTPEmail } from "./EmailService";

export const saveOTP = async (
  email: string | null,
  userData: {
    name: string | null;
    mobile: string | null;
    password: string | null;
    email:string|null
  }
): Promise<string> => {
  const otp = generateOtp();
  const dataToStore = JSON.stringify({
    otp,
    userData,
  });
  console.log(dataToStore)
  await redis.setex(`otp:${email}`, 300, dataToStore);
  return otp;
};




export const verifyOTP = async (
  email: string | null,
  userOTP: string | null
): Promise<{ isValid: boolean; storedData?: any }> => {
  if (!email || !userOTP) return { isValid: false };
  
  const storedData = await redis.get(`otp:${email}`);
  console.log(storedData, "storedData");
  
  if (!storedData) return { isValid: false };
  
  try {
    const parsedData = JSON.parse(storedData);
    const { otp, userData } = parsedData; 

    if (otp !== userOTP) return { isValid: false };

    await redis.del(`otp:${email}`); 

    return { isValid: true, storedData: userData }; 
  } catch (error) {
    console.error("Error parsing stored OTP data:", error);
    return { isValid: false };
  }
};


export class OtpService{
  async resendOTP(email:string):Promise<void>{
    const otp=generateOtp()
    await redis.setex(`otp:${email}`, 120, JSON.stringify({ otp }));
    await sendOTPEmail(email,otp)
  }
}
