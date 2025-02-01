import { saveOTP } from "../../infrastructure/services/otpService";
import { sendOTPEmail } from "../../infrastructure/services/EmailService";

export class resendOtpUseCase{
    async execute(email:string):Promise<void>{
        if(!email){
            throw new Error('Email is required')
        }

        const otp=await saveOTP(email,{
            email,
            name: null,
            mobile: null,
            password: null
        })
        await sendOTPEmail(email,otp)
    }
}