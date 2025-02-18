import express from 'express'
const router=express.Router()

import { logoutUser, registerUser,verifyUserOTP,resendOTP,loginUser,getUserProfile,updateUserProfile,
    forgotPassword,
    resetPassword,
 } from "../controllers/UserController";
 import { protect } from '../middlewares/authMiddleware';
 import {googleAuth} from '../controllers/AuthController'


router.post('/register',registerUser)
router.post('/otp',verifyUserOTP)
router.post('/logout',logoutUser)
router.post('/resend-otp',resendOTP)
router.post('/login',loginUser)
router.post("/auth/google", googleAuth);
router.route('/Profile')
            .get(protect,getUserProfile)
            .put(protect,
                // upload.single('image'),
                updateUserProfile
            )

router.post("/forgetPassword",forgotPassword);
router.post("/resetPassword", resetPassword);


export default router