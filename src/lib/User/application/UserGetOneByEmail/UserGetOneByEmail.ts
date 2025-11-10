import { UserEmail } from '../../domain/entities/User/value-objects';
import { UserNotFoundError } from '../../domain/exceptions';
import { UserRepository } from '../../domain/repositories';

interface UserGetOneByEmailProps {
  email: string;
}

export class UserGetOneByEmail {
  constructor(private readonly repository: UserRepository) {}

  async handler(props: UserGetOneByEmailProps) {
    const result = await this.repository.getOneByEmail(
      UserEmail.create(props.email),
    );

    if (!result) throw new UserNotFoundError();

    return result.toResponse();
  }
}
