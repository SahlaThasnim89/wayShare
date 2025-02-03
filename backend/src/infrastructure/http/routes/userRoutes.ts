import express from 'express'
const router=express.Router()

import { logoutUser, registerUser,verifyUserOTP,resendOTP,loginUser,getUserProfile
//     forgotPassword,
//   resetPassword,
 } from "../controllers/UserController";
 import { protect } from '../middlewares/authMiddleware';


router.post('/register',registerUser)
router.post('/otp',verifyUserOTP)
router.post('/logout',logoutUser)
router.post('/resend-otp',resendOTP)
router.post('/login',loginUser)
router.route('/Profile').get(protect,getUserProfile)
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);


export default router