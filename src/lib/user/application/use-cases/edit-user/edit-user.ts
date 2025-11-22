import { UseCase } from '~/lib/shared/application';
import { ValidationError } from '~/lib/shared/domain';
import {
  UserResponse,
  UserRepositoryPort,
  UserId,
  UserNotFoundError,
  UserPassword,
  UserScore,
  UserStatus,
  UserPicture,
} from '~/lib/user/domain';

export interface EditUserDTO {
  userId: string;
  name?: string;
  password?: string;
  picture?: string;
  score?: number;
  status?: boolean;
  currentRole?: string;
}

export class EditUserUseCase implements UseCase<EditUserDTO, UserResponse> {
  constructor(private readonly repository: UserRepositoryPort) {}

  async execute(props: EditUserDTO): Promise<UserResponse> {
    const user = await this.repository.getOneById(new UserId(props.userId));

    if (!user) throw new UserNotFoundError();

    if (props.password && user.providerData.value === 'AUTH')
      user.password = UserPassword.create(props.password);
    else if (props.password)
      throw new ValidationError(
        "Can't update password when you signed with OAuth provider",
      );

    //el score lo editan demas negocios y hoteles, comportamiento de usuario
    if (props.score !== undefined && props.score !== user.score?.value) {
      if (props.currentRole === 'USER')
        throw new ValidationError('You are not allowed to modify your score.');

      user.score = UserScore.create(props.score);
    }

    if (props.status !== undefined && props.status !== user.status?.value)
      user.status = new UserStatus(props.status);

    if (props.picture) user.picture = new UserPicture(props.picture);

    const edited = await this.repository.edit(user);

    return edited.toResponse();
  }
}
