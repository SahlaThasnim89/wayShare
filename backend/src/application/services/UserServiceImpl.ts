import { IUserRepository } from '../../domain/repositories/UserRepository';
import { IUserService } from '../interfaces/UserService';
import { UserRepositoryImpl } from '../../infrastructure/database/mongoose/UserRepositoryImpl';
import { passwordHashingService } from '../../shared/utils/hashUtils'; 
import { IUser } from '../../domain/entities/User';
import User from '../../infrastructure/database/mongoose/UserModel';
import { GetUserProfile } from '../../domain/usecases/GetUserProfile';
import { UpdateUser } from './../../domain/usecases/UpdateUser';

export class UserServiceImpl implements IUserService{
    findByEmail(email: string) {
        throw new Error("Method not implemented.");
    }
    private UserRepository:IUserRepository;
    private hashingService:passwordHashingService;
    private getUserProfileUseCase:GetUserProfile;
    private UpdateUserUseCase:UpdateUser;



    constructor(userRepository?:IUserRepository){
        this.UserRepository=new UserRepositoryImpl()
        this.hashingService=new passwordHashingService()
        this.getUserProfileUseCase=new GetUserProfile(this.UserRepository)
        this.UpdateUserUseCase=new UpdateUser(this.UserRepository)
    }



    async registerUser(name:string,email: string, password: string, mobile: string):Promise<IUser>{
        console.log('register start')
        const existingUser=await this.UserRepository.findOneByEmail(email);
        console.log(existingUser,'existingUser')
        if(existingUser){
            throw new Error('User already exists')
        }

        const hashedPassword=await this.hashingService.hashPassword(password)
        const newUser = await this.UserRepository.create({
            name,
            email,
            password: hashedPassword,
            mobile,
        });

        
        return newUser;
    }

  

    async getUserProfile(userId:string){
        return await this.getUserProfileUseCase.execute(userId)
    }

    async updateUserProfile(userId:string,userData:Partial<IUser>):Promise<IUser|null>{
        return this.UpdateUserUseCase.execute(userId,userData);
    }


}