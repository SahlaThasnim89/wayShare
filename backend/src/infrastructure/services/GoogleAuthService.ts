import { OAuth2Client } from "google-auth-library";
import { environment } from "../../config/environment";

export class GoogleAuthService{
    private client=new OAuth2Client(environment.clientId)

    async verifyToken(token:string){
        const ticket=await this.client.verifyIdToken({
            idToken:token,
            audience:environment.clientId
        })

        const payload=ticket.getPayload()
        if(!payload)throw new Error('Invalid Google token')

            return {
                googleId: payload.sub,
                name: payload.name || "",
                email: payload.email || "",
              };    
    }
}