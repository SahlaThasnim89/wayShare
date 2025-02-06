import express from 'express'
import {authAdmin,logoutAdmin} from '../controllers/AdminController'



const router = express.Router();

router.post("/login", authAdmin);
router.post("/logout", logoutAdmin);

export default router;