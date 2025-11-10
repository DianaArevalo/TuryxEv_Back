import {
  BusinessEmail,
  BusinessNotFoundError,
  BusinessRepository,
} from '../../domain';

interface GetOneBusinessByEmailHandlerProps {
  email: string;
}

export class GetOneBusinessByEmail {
  constructor(private readonly repository: BusinessRepository) {}

  async handler(props: GetOneBusinessByEmailHandlerProps) {
    const result = await this.repository.getOneByEmail(
      BusinessEmail.create(props.email),
    );

    if (!result) throw new BusinessNotFoundError();

    return result.toPublicResponse();
  }
}
