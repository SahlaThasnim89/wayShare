import { IUserRepository } from './../../../domain/repositories/UserRepository';
import { IUserService } from '../../../interfaces/UserService';
import { UserRepositoryImpl } from '../../../infrastructure/database/mongoose/userRepositoryImpl';
import {passwordHashingService} from '../../../utils/hashUtils'

export class UserServiceImpl implements IUserService{
    private UserRepository:IUserRepository;
    private hashingService:passwordHashingService;


    constructor(){
        this.UserRepository=new UserRepositoryImpl()
        this.hashingService=new passwordHashingService()
    }

    async registerUser(name:string,email: string, password: string, mobile: string){
        const existingUser=await this.UserRepository.findOneByEmail(email);
        if(existingUser){
            throw new Error('User already exists')
        }

        const hashedPassword=await this.hashingService.hashPassword(password)
        const newUser=await this.UserRepository.create({
            name,
            email,
            password:hashedPassword,
            mobile,
            isBlocked:false,
        });

    }
}