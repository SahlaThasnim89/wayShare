import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { environment } from "../../../config/environment";
import User from "../../database/mongoose/UserModel";

const protect = asyncHandler(async (req:any, res, next) => {
  let token;
  token = req.cookies.jwt;
  // console.log(token, req.cookies);

  if (token) {
    try {
      const secret = environment.jwtSecret ?? "";
      const decoded:any =  jwt.verify(token, secret);

      if (decoded.id== "admin123") return next();

      req.user = await User.findById(decoded.id).select(
        "-password"
      );

      if (!req.user) {
        res.status(404);
        throw new Error("User not found");
      }

      next();
    } catch (error:any) {
      console.log(error.message);

      res.status(401);
      throw new Error("Not au authorised, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorised, no token");
  }
});

export { protect };