import bcrypt from 'bcryptjs'


export class passwordHashingService{
    async hashPassword(password:string):Promise<string>{
        const salt=await bcrypt.genSalt(10)
        return bcrypt.hash(password,salt)
    }

    async comparePassword(password:string,hashedPassword:string):Promise<boolean>{
        return await bcrypt.compare(password,hashedPassword)
    }
}