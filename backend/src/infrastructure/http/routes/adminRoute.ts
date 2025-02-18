import express from 'express'
import {authAdmin,logoutAdmin,getUsers,blockUser} from '../controllers/AdminController'
import { protect,authorize } from '../middlewares/authMiddleware';




const router = express.Router();

router.post("/login", authAdmin);
router.post("/logout", logoutAdmin);
//make within protect
router.get('/UserList', 
    protect, authorize(["admin"]),
    getUsers)
router.patch('/blockUser/:id',
    protect, authorize(["admin"]),
    blockUser)

export default router;