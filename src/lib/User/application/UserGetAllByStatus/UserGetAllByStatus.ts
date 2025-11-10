import { UserStatus } from '../../domain/entities/User/value-objects';
import { UserRepository } from '../../domain/repositories';

interface UserGetAllByStatusProps {
  status: boolean;
}

export class UserGetAllByStatus {
  constructor(private readonly repository: UserRepository) {}

  async handler(props: UserGetAllByStatusProps) {
    const records = await this.repository.getAllByStatus(
      new UserStatus(props.status),
    );

    return records.map((record) => record.toResponse());
  }
}
