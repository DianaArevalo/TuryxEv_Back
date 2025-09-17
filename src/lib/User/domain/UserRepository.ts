
import {User} from "./User"
import { UserEmail } from "./UserEmail"
import { UserId } from "./UserId"

export interface UserRepository {
    create(user: User): Promise<void>
    getOneById(id: UserId): Promise<User | null>
    getAll(): Promise<User[]>;
    //getOneByEmail(email: UserEmail): Promise <User | null>
    edit(user: User): Promise<void>
    delete(id: UserId): Promise<void>
}

