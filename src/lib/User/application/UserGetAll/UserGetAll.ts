
import { LimitValueObject, PageValueObject } from "../../../../lib/Shared/domain";
import { UserRepository } from "../../domain/repositories";

interface UserGetAllProps {
    page?: number;
    limit?: number;
}
export class UserGetAll {
    constructor(private readonly repository: UserRepository){}

    async handler(props: UserGetAllProps) {
        const result = await this.repository.getAll(
            PageValueObject.create(props.page),
            LimitValueObject.create(props.limit)
        );
        
        return result.map((it) => it.toResponse());
    }
}