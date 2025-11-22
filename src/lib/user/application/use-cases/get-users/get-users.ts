import { UseCase } from '~/lib/shared/application';
import { PageValueObject, LimitValueObject } from '~/lib/shared/domain';
import {
  UserResponse,
  UserRepositoryPort,
  User,
  UserStatus,
} from '~/lib/user/domain';

export interface GetUsersDTO {
  page?: number;
  limit?: number;
  status?: boolean;
}

export class GetUsersUseCase implements UseCase<GetUsersDTO, UserResponse[]> {
  constructor(private readonly repository: UserRepositoryPort) {}

  async execute(props: GetUsersDTO): Promise<UserResponse[]> {
    const page = PageValueObject.create(props.page);
    const limit = LimitValueObject.create(props.limit);

    let result: User[] | null = null;

    if (props.status)
      result = await this.repository.getByStatus(
        page,
        limit,
        new UserStatus(props.status),
      );

    if (!result) result = await this.repository.getAll(page, limit);

    return result.map((it) => it.toResponse());
  }
}
