import { UserId, UserStatus } from "../../domain/entities/User/value-objects";
import { UserNotFoundError } from "../../domain/exceptions";
import { UserRepository } from "../../domain/repositories";

interface UserSoftDeleteProps {
    id: string;
}
export class UserSoftDelete {
    constructor (private readonly repository: UserRepository) {}

    async handler(props: UserSoftDeleteProps){
        await this.repository.softDelete(new UserId(props.id))
    }
}

