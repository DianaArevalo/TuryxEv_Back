import { NotFoundError } from "~/lib/Shared/domain";

export class UserNotFoundError extends NotFoundError {
    constructor(message: string = "User not found"){
        super(message);
    }
}