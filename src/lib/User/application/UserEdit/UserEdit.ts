import { User } from "../../domain/User";
import { UserCreatedAt } from "../../domain/entities/User/value-objects/UserCreatedAt";
import { UserEmail } from "../../domain/entities/User/value-objects/UserEmail";
import { UserId } from "../../domain/entities/User/value-objects/UserId";
import { UserName } from "../../domain/entities/User/value-objects/UserName";
import { UserNotFoundError } from "../../domain/exceptions/UserNotFoundError";
import { UserPassword } from "../../domain/entities/User/value-objects/UserPassword";
import { UserRepository } from "../../domain/UserRepository";
import { UserStatus } from "../../domain/entities/User/value-objects/UserStatus";
import { UserUpdatedAt } from "../../domain/entities/User/value-objects/UserUpdatedAt";

export class UserEdit {
    constructor(private repository: UserRepository){}

    async handle(
        id: string,
        name: string,
        email: string,
        createdAt: Date,        
        password: string, 
        status: boolean,       
        
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
            currentUser.role,
            new UserStatus(status)
            
        );

        await this.repository.edit(user)

        return user;
    }
}