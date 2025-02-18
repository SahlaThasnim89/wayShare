import { IAdminService } from './../interfaces/AdminService';
import {IUser} from '../../domain/entities/User'
import { GetUserUseCase } from './../../domain/usecases/GetUsers';
import { BlockUser } from '../usecases/BlockUser';
import { IUserRepository } from './../../domain/repositories/UserRepository';


export class AdminServiceImpl implements IAdminService{
    private getUsersUseCase:GetUserUseCase;
    private blockUserUseCase:BlockUser;

    constructor(userRepository: IUserRepository){
        this.getUsersUseCase=new GetUserUseCase(userRepository);
        this.blockUserUseCase=new BlockUser(userRepository)
    }

    async getUsers():Promise<IUser[]>{
        return await this.getUsersUseCase.execute()
    }

    async blockUser(userId:string,isBlocked:boolean){
        return await this.blockUserUseCase.execute(userId,isBlocked)
    }


}
