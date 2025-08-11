import { User } from "../../domain/User";
import { UserCreatedAt } from "../../domain/UserCreatedAt";
import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserName } from "../../domain/UserName";
import { UserPassword } from "../../domain/UserPassword";
import { UserRepository } from "../../domain/UserRepository";

export class UserEdit {
    constructor(private repository: UserRepository){}

    async handle(
        id: string,
        name: string,
        email: string,
        password: string
        
    ): Promise <void>{

        const currentUser = await this.repository.getOneById(new UserId(id));

        if (!currentUser) {
            throw new Error("Usuario no encontrado")
        }

        const user = new User(
            new UserId(id),
            new UserName(name),
            new UserEmail(email),
            new UserPassword(password),
            new UserCreatedAt(new Date()),
            currentUser.role
            
        );

        return this.repository.edit(user)
    }
}