import express from 'express'
const router=express.Router()

import { logoutUser, registerUser,verifyUserOTP,resendOTP,loginUser
//     forgotPassword,
//   resetPassword,
 } from "../controllers/UserController";


router.post('/register',registerUser)
router.post('/otp',verifyUserOTP)
router.post('/logout',logoutUser)
router.post('/resend-otp',resendOTP)
router.post('/login',loginUser)
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);


export default router