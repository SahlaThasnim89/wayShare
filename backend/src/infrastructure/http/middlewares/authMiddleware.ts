import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { environment } from "../../../config/environment";
import User from "../../database/mongoose/UserModel";


const protect = asyncHandler(async (req:any, res, next) => {
  let token;
  token = req.cookies.jwt;
  console.log(token, req.cookies);

  if (token) {
    console.log(1)
    try {
      const secret = environment.jwtSecret;
      if (!secret) {
        throw new Error("JWT Secret is missing in environment configuration");
    }
      console.log(secret,token,2)
      const decoded:any =  jwt.verify(token, secret);
      console.log(decoded,3)

      if (decoded.id== environment.adminId) {
        console.log(5)
        req.user = { _id: environment.adminId, role: "admin" };
        console.log(req.user,6)
        return next();
      }
  

      const user:any = await User.findById(decoded.id).select(
        "-password"
      );

      console.log(user,6)

      if (!user) {
        res.status(404);
        throw new Error("User not found");
      }
      req.user = { _id: user._id, role: user.role };
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


const authorize=(roles:string[])=>{
  return (req:any,res:any,next:any)=>{
    if(!req.user||!roles.includes(req.user.role)){
      res.status(403)
      throw new Error("Forbidden: You do not have permission");
    }
    next();
  }
}

export { protect,authorize };