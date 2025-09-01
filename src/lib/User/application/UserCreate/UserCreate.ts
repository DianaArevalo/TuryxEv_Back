import { User } from "../../domain/User";
import { UserCreatedAt } from "../../domain/UserCreatedAt";
import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserName } from "../../domain/UserName";
import { UserPassword } from "../../domain/UserPassword";
import { UserRepository } from "../../domain/UserRepository";
import { UserUpdatedAt } from "../../domain/UserUpdatedAt";

export class UserCreate {
    constructor (private repository: UserRepository){}


    async handler(
        id: string,
        name: string,
        email: string,
        password: string,
        createdAt: Date,        

        role: 'CLIENT' | 'HOTEL' | 'BUSINESS' | 'ADMIN'

    ): Promise <void>{
        const user = new User(
            new UserId(id),
            new UserName(name),
            new UserEmail(email),
            new UserPassword(password),
            new UserCreatedAt(createdAt),
            new UserUpdatedAt(new Date()),
            role
        );

        return this.repository.create(user)
    }
}