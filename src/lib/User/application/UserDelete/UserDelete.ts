import { UserId } from "../../domain/UserId";
import { UserNotFoundError } from "../../domain/UserNotFoundError";
import { UserRepository } from "../../domain/UserRepository";

export class UserDelete {
    constructor (private repository: UserRepository) {}

    async handle(id: string): Promise <void>{        
        const userId = new UserId(id)

        const currentUser = await this.repository.getOneById(userId);

        if (!currentUser) throw new UserNotFoundError("user not found");

        await this.repository.delete(userId)
    }
}