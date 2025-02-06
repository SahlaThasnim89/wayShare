import { User } from "../../domain/entities/User";

export interface IAdminService {
  getUsers(): Promise<User[]>;
}
