import {
  SuperAdminEmail,
  SuperAdminNotFoundError,
  SuperAdminRepository,
} from '../../domain';

interface GetOneSuperAdminByEmailHandlerProps {
  email: string;
}

export class GetOneSuperAdminByEmail {
  constructor(private readonly repository: SuperAdminRepository) {}

  async handler(props: GetOneSuperAdminByEmailHandlerProps) {
    const record = await this.repository.getOneByEmail(
      new SuperAdminEmail(props.email),
    );

    if (!record) throw new SuperAdminNotFoundError();

    return record.toResponse();
  }
}
