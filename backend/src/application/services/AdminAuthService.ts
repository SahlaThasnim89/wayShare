import { adminCredentials } from "../../config/adminConfig";

export class AdminAuthService{
    static authenticate(email:string,password:string){
        return (
            email === adminCredentials.email && password === adminCredentials.password
        )
    }


    static logout (res:any){
        res.cookie('jwt','',{
            httpOnly:true,
            expires:new Date(0),
        })
    }

    
}

