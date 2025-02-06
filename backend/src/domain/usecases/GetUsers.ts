import { IUserRepository } from "../repositories/UserRepository";

export class getUserUseCase{
    private userRepository:IUserRepository;

    constructor (userRepository:IUserRepository){
        this.userRepository=userRepository;
    }

    async execute(){
        return await this.userRepository.getAllUsers();
    }
}