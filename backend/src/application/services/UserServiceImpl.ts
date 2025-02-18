import { IUserRepository } from '../../domain/repositories/UserRepository';
import { IUserService } from '../interfaces/UserService';
import { UserRepositoryImpl } from '../../infrastructure/database/mongoose/UserRepositoryImpl';
import { passwordHashingService } from '../../shared/utils/hashUtils'; 
import { IUser } from '../../domain/entities/User';
import User from '../../infrastructure/database/mongoose/UserModel';
import { GetUserProfile } from '../../domain/usecases/GetUserProfile';
import { UpdateUser } from './../../domain/usecases/UpdateUser';
import { GetUserUseCase } from './../../domain/usecases/GetUsers';

export class UserServiceImpl implements IUserService{
    // findByEmail(email: string) {
    //     throw new Error("Method not implemented.");
    // }
    async findByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email }) || null;
    }

    private UserRepository:IUserRepository;
    private hashingService:passwordHashingService;
    private getUserProfileUseCase:GetUserProfile;
    private UpdateUserUseCase:UpdateUser;
    private getUserUseCase:GetUserUseCase;



    constructor(userRepository?:IUserRepository){
        this.UserRepository=new UserRepositoryImpl()
        this.hashingService=new passwordHashingService()
        this.getUserProfileUseCase=new GetUserProfile(this.UserRepository)
        this.UpdateUserUseCase=new UpdateUser(this.UserRepository)
        this.getUserUseCase=new GetUserUseCase(this.UserRepository)
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

    async getAllUsers() {
        return this.getUserUseCase.execute();
      }

    async updatePassword(email: string, newPassword: string): Promise<void> {
        const user = await this.UserRepository.findOneByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
    }

}