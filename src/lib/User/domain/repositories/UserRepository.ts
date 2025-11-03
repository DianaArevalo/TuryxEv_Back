
import { User } from "../entities/User/User";
import { UserEmail, UserId, UserStatus } from "../entities/User/value-objects";



export interface UserRepository {
    create(user: User): Promise<User>
    getOneById(id: UserId): Promise<User | null>
    getAll(): Promise<User[]>;
    getOneByEmail(email: UserEmail): Promise <User | null>
    edit(user: User): Promise<void>
    softDelete(id: UserId): Promise<void>
    getAllByIsActive(isActive: UserStatus): Promise<User[]>
}

