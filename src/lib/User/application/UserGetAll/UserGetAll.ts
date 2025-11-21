import { Limit, Page } from '../../../../lib/shared/domain';
import { UserRepository } from '../../domain/repositories';

interface UserGetAllProps {
  page?: number;
  limit?: number;
}
export class UserGetAll {
  constructor(private readonly repository: UserRepository) {}

  async handler(props: UserGetAllProps) {
    const result = await this.repository.getAll(
      Page.create(props.page),
      Limit.create(props.limit),
    );

    return result.map((it) => it.toResponse());
  }
}
