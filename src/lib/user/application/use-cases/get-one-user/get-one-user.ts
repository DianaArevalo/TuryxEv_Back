import { UseCase } from '~/lib/shared/application';
import { HttpError } from '~/lib/shared/domain';
import {
  UserResponse,
  UserRepositoryPort,
  UserId,
  UserEmail,
  UserNotFoundError,
} from '~/lib/user/domain';

export interface GetOneUserDTO {
  id?: string;
  email?: string;
}

export class GetOneUserUseCase implements UseCase<GetOneUserDTO, UserResponse> {
  constructor(private readonly repository: UserRepositoryPort) {}

  async execute(props: GetOneUserDTO): Promise<UserResponse> {
    if ((!props.id && !props.email) || (props.id && props.email))
      throw new HttpError('Either id or email must be provided.', 400);

    let result = null;

    if (props.id)
      result = await this.repository.getOneById(new UserId(props.id));
    else if (props.email)
      result = await this.repository.getOneByEmail(
        UserEmail.create(props.email),
      );

    if (!result) throw new UserNotFoundError();

    return result.toResponse();
  }
}
