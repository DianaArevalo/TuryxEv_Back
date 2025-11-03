import { User } from "../../domain/entities/User/User";
import { UserId } from "../../domain/entities/User/value-objects";
import { UserNotFoundError } from "../../domain/exceptions";
import { UserRepository } from "../../domain/repositories";


interface UserGetOneByIdProps {
  id: string;
}
export class UserGetOneById {
      constructor (private readonly repository: UserRepository){}

      async handler(props: UserGetOneByIdProps) {
        const result = await this.repository.getOneById(new UserId(props.id));

        if(!result) throw new UserNotFoundError();

        return result.toResponse();
      }
}
  
