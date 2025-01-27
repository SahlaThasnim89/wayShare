import { UserRepository } from "../../domain/repositories/userRepository";
import { User } from "../../domain/models/user";
import { generateToken } from "../../utils/generateToken";
import bcrypt from 'bcryptjs'

export class UserService{
    private userRepository:UserRepository;

    constructor(userRepository:UserRepository){
        this.userRepository=userRepository;
    }

    async registerUser(name:string,email:string,mobile:string,password:string){
        const userExists=await this.userRepository.findByEmail(email)
        if(userExists){
            throw new Error("User already exists")
        }

        const Password = await bcrypt.hash(password, 10);

        const user=new User('',name,email,Password,mobile);
        const createdUser=await this.userRepository.create(user);

        generateToken(createdUser._id)
        return createdUser;
    }
}