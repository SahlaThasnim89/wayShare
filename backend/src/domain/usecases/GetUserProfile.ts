import {IUserRepository} from '../repositories/UserRepository'

export class GetUserProfile{
    private userRepository:IUserRepository;

    constructor(userRepository:IUserRepository){
        this.userRepository=userRepository;
    }

    async execute(userId:string){
        const user=await this.userRepository.findById(userId)

        if(!user){
            throw new Error('User not found')
        }

        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            // image: user.image,
            // createdTime: user.createdAt,
            isBlocked: user.isBlocked,
        };
    }
}