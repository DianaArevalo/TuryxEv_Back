import { ProviderDataT, ValidationError } from '../../../../lib/shared/domain';
import { User } from '../../domain/entities/User/User';
import {
  UserCreatedAt,
  UserEmail,
  UserName,
  UserPassword,
  UserPicture,
  UserPlan,
  UserProvider,
  UserRole,
  UserScore,
  UserStatus,
  UserUpdatedAt,
} from '../../domain/entities/User/value-objects';
import { UserRepository } from '../../domain/repositories';

export interface UserCreateProps {
  name: string;
  email: string;
  password?: string;
  picture?: string;
  plan?: string;
  role?: string;
  score?: number;
  providerData?: string;
}

export class UserCreate {
  constructor(private readonly repository: UserRepository) {}

  async handler(props: UserCreateProps) {
    const createdAt = UserCreatedAt.now();

    const provider: ProviderDataT = props.providerData
      ? (props.providerData as ProviderDataT)
      : 'AUTH';

    if (!props.password && props.providerData === 'AUTH') {
      throw new ValidationError(
        'Password is required when providerData is AUTH',
      );
    }

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
      providerData: UserProvider.create(provider),
      status: new UserStatus(true),
    });

    const created = await this.repository.create(user);

    return created.toResponse();
  }
}
