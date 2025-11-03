import { User } from "../../domain/User";
import { UserCreatedAt } from "../../domain/entities/User/value-objects/UserCreatedAt";
import { UserEmail } from "../../domain/entities/User/value-objects/UserEmail";
import { UserId } from "../../domain/entities/User/value-objects/UserId";
import { UserName } from "../../domain/entities/User/value-objects/UserName";
import { UserPassword } from "../../domain/entities/User/value-objects/UserPassword";
import { UserRepository } from "../../domain/UserRepository";
import { UserStatus } from "../../domain/entities/User/value-objects/UserStatus";
import { UserUpdatedAt } from "../../domain/entities/User/value-objects/UserUpdatedAt";

export class UserCreate {
    constructor (private repository: UserRepository){}


    async handler(
        id: string,
        name: string,
        email: string,
        password: string,
        createdAt: Date,        

        role: 'CLIENT' | 'HOTEL' | 'BUSINESS' | 'ADMIN',
        status: boolean

    ): Promise <void>{
        const user = new User(
            new UserId(id),
            new UserName(name),
            new UserEmail(email),
            new UserPassword(password),
            new UserCreatedAt(createdAt),
            new UserUpdatedAt(new Date()),            
            role,
            new UserStatus(status),
        );

        return this.repository.create(user)
    }
}