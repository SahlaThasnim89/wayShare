import { IUserRepository } from "../repositories/UserRepository";
import { IUser } from './../entities/User';
import { IAdminService } from './../../application/interfaces/AdminService';


export class GetUserUseCase {
    private userRepository:IUserRepository;

    constructor (userRepository:IUserRepository){
        this.userRepository=userRepository;
    }

    async execute(){
        return await this.userRepository.getAllUsers();
    }
}