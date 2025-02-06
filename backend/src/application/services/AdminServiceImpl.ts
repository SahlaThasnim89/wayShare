import { IAdminService } from './../interfaces/AdminService';
import {User} from '../../domain/entities/User'
import { getUserUseCase } from './../../domain/usecases/GetUsers';

export class AdminServiceImpl implements IAdminService{
    private GetUsersUseCase:getUserUseCase;

    constructor(GetUsersUseCase:getUserUseCase){
        this.GetUsersUseCase=GetUsersUseCase;
    }

    async getUsers():Promise<User[]>{
        return await this.GetUsersUseCase.execute()
    }
}
