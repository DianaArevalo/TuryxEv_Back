
import { Limit, Page } from "~/lib/Shared/domain";
import { User } from "../entities/User/User";
import { UserEmail, UserId, UserStatus } from "../entities/User/value-objects";



export interface UserRepository {
    create(user: User): Promise<User>
    getOneById(id: UserId): Promise<User | null>
    getAll(page: Page, limit: Limit): Promise<User[]>;
    getOneByEmail(email: UserEmail): Promise <User | null>
    edit(user: User): Promise<User>
    softDelete(id: UserId): Promise<User>
    getAllByStatus(isActive: UserStatus): Promise<User[]>
}

