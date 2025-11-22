import { UseCase } from '~/lib/shared/application';
import { ValidationError } from '~/lib/shared/domain';
import {
  User,
  UserCreatedAt,
  UserEmail,
  UserName,
  UserPassword,
  UserPicture,
  UserPlan,
  UserProviderData,
  UserResponse,
  UserRole,
  UserScore,
  UserStatus,
  UserUpdatedAt,
  UserRepositoryPort,
} from '~/lib/user/domain';

export interface CreateUserDTO {
  name: string;
  email: string;
  password?: string;
  picture?: string;
  plan?: string;
  role?: string;
  score?: number;
  providerData?: string;
}

export class CreateUserUseCase implements UseCase<CreateUserDTO, UserResponse> {
  constructor(private readonly repository: UserRepositoryPort) {}

  async execute(props: CreateUserDTO): Promise<UserResponse> {
    const createdAt = UserCreatedAt.now();

    if (!props.password && props.providerData === 'AUTH')
      throw new ValidationError(
        'Password is required when providerData is AUTH',
      );

    const user = new User({
      name: UserName.create(props.name),
      email: UserEmail.create(props.email),
      password: props.password
        ? UserPassword.create(props.password)
        : undefined,
      picture: props.picture ? new UserPicture(props.picture) : undefined,
      score: UserScore.create(props.score ?? 5),
      createdAt: createdAt,
      updatedAt: UserUpdatedAt.now(createdAt),
      role: UserRole.create(props.role ?? 'USER'),
      plan: props.plan ? UserPlan.create(props.plan) : UserPlan.default(),
      providerData: UserProviderData.create(props.providerData || 'AUTH'),
      status: new UserStatus(true),
    });

    const created = await this.repository.create(user);

    return created.toResponse();
  }
}
