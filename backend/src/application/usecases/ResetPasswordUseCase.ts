import { UserServiceImpl } from "../services/UserServiceImpl";
import redis from '../../infrastructure/services/RedisService'
import { passwordHashingService } from "../../shared/utils/hashUtils";

export class ResetPasswordUseCase{
    private userService:UserServiceImpl;
    private hashingService:passwordHashingService;

    constructor(){
        this.userService=new UserServiceImpl()
        this.hashingService=new passwordHashingService()
    }

    async execute(email:string,token:string,password:string):Promise<void>{
        const storedToken=await redis.get(`reset:${email}`)
        if (!storedToken || storedToken !== token) {
            throw new Error("Invalid or expired reset token");
          }

          const hashedPassword=await this.hashingService.hashPassword(password)
          await this.userService.updatePassword(email,hashedPassword)
          await redis.del(`reset:${email}`)

    }
}