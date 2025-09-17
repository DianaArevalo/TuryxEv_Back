import { User } from "../../domain/User";
import { UserCreatedAt } from "../../domain/UserCreatedAt";
import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserName } from "../../domain/UserName";
import { UserNotFoundError } from "../../domain/UserNotFoundError";
import { UserPassword } from "../../domain/UserPassword";
import { UserRepository } from "../../domain/UserRepository";
import { UserUpdatedAt } from "../../domain/UserUpdatedAt";

export class UserEdit {
    constructor(private repository: UserRepository){}

    async handle(
        id: string,
        name: string,
        email: string,
        createdAt: Date,        
        password: string,        
        
    ): Promise <User>{

        const currentUser = await this.repository.getOneById(new UserId(id));

        if (!currentUser) {
            throw new UserNotFoundError("User not found")
        }

        const user = new User(
            new UserId(id),
            new UserName(name),
            new UserEmail(email),
            new UserPassword(password),
            new UserCreatedAt(createdAt),
            new UserUpdatedAt(new Date()),
            currentUser.role
            
        );

        await this.repository.edit(user)

        return user;
    }
}