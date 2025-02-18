import nodemailer from 'nodemailer'
import { environment } from '../../config/environment'
import SMTPTransport from 'nodemailer/lib/smtp-transport'


const transporter=nodemailer.createTransport(
    new SMTPTransport({
    host: "smtp.gmail.com",
    port: 587, // 
    secure: false,
    auth:{
        user:environment.userEmail,
        pass:environment.userPassword
    }
})
)

export const sendOTPEmail=async(email:string,otp:string)=>{
    const mail=await transporter.sendMail({
        from:environment.userEmail,
        to:email,
        subject: "Your OTP Code",
        text: `Your OTP code is: ${otp}`,
    })
}


export const sendResetPasswordEmail=async(email:string,resetLink:string)=>{
    try {
        await transporter.sendMail({
            from: `"Your App Name" <${environment.userEmail}>`,
            to: email,
            subject: "Reset Your Password",
            text: `Click the link below to reset your password:\n\n${resetLink}\n\nThis link will expire in 10 minutes.`,
        })
    console.log(`Password reset email sent to ${email}`);
    } catch (error: any) {
      console.error("Error sending reset password email:", error.message);
    }
}