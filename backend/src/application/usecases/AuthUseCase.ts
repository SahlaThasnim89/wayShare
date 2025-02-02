import { AuthService } from "../../infrastructure/services/AuthService";
import { generateToken } from "../../shared/utils/tokenUtils";
import { IUser } from './../../domain/entities/User';



export class AuthUseCase{
    private authService:AuthService;

    constructor(){
        this.authService=new AuthService()

    }
        async execute(email:string,password:string,res:any):Promise<IUser|null>=>{
            const user=await this.authService.login(email,password)
            if(user){
                generateToken(user);
                return user
            }
            return null
        
    }
}