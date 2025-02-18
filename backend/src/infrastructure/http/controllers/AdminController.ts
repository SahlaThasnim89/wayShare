import { AdminAuthService } from "../../../application/services/AdminAuthService";
import { generateToken } from "../../../shared/utils/tokenUtils";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { UserServiceImpl } from "../../../application/services/UserServiceImpl";
import { UserRepositoryImpl } from "../../database/mongoose/UserRepositoryImpl";
import { AdminServiceImpl } from "../../../application/services/AdminServiceImpl";
import { environment } from "../../../config/environment";


const authAdmin = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    if (AdminAuthService.authenticate(email, password)) {
      const adminUser = {
        _id: environment.adminId,
        name: "Admin",
        email,
      };
      console.log(adminUser,'adminUser')

      generateToken(res, adminUser);

      res.status(200).json(adminUser);
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  }
);

const logoutAdmin = asyncHandler(async (req: Request, res: Response) => {
  AdminAuthService.logout(res);
  res.status(200).json({ message: "Logged out successfully" });
});

const userRepository = new UserRepositoryImpl();
const userService = new UserServiceImpl(userRepository);
const adminService = new AdminServiceImpl(userRepository);

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const blockUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isBlocked } = req.body;

    const user = await adminService.blockUser(id, isBlocked);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in blocking user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { authAdmin, logoutAdmin, getUsers, blockUser };
