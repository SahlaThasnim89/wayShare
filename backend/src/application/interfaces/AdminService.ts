import { IUser } from "../../domain/entities/User";

export interface IAdminService {
  getUsers(): Promise<IUser[]>;
  blockUser(userId: string, isBlocked: boolean): Promise<Partial<IUser> | null>; 
}
