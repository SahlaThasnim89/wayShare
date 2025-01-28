import express from 'express'
const router=express.Router()

import { registerUser } from "../controllers/UserController";


router.post('/register',registerUser)
// router.post('/otp',submitOtp)


export default router