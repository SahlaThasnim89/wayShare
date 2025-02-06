import { Request,Response } from "express";
import { GoogleAuthUseCase } from './../../../domain/usecases/GoogleAuth';

import { UserRepositoryImpl } from "../../database/mongoose/UserRepositoryImpl";
import { GoogleAuthService } from "../../services/GoogleAuthService";

// Initialize dependencies
const userRepository = new UserRepositoryImpl();
const googleAuthService = new GoogleAuthService();
const googleAuthUseCase = new GoogleAuthUseCase(userRepository, googleAuthService);

export const googleAuth = async (req: Request, res: Response):Promise<any> => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ success: false, message: "No token provided" });
        }

        console.log(token,'hfdhg')
        const user = await googleAuthUseCase.execute(token);
        console.log("User after execute():", user);

        if (!user) {
            console.log("No user returned from GoogleAuthUseCase!");
            return res.status(500).json({ success: false, message: "User creation failed" });
        }

        return res.status(200).json({ success: true, user });
    } catch (error:any) {
        return res.status(401).json({ success: false, message: error.message });
    }
};
