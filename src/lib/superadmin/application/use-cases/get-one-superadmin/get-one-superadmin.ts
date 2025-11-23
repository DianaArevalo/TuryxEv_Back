import { UseCase } from '~/lib/shared/application';
import { HttpError } from '~/lib/shared/domain';
import {
  SuperAdmin,
  SuperAdminEmail,
  SuperAdminId,
  SuperAdminNotFoundError,
  SuperAdminRepositoryPort,
  SuperAdminResponse,
} from '~/lib/superadmin/domain';

export interface GetOneSuperAdminDTO {
  id?: string;
  email?: string;
}

export class GetOneSuperAdminUseCase
  implements UseCase<GetOneSuperAdminDTO, SuperAdminResponse>
{
  constructor(private readonly repository: SuperAdminRepositoryPort) {}

  async execute(props: GetOneSuperAdminDTO): Promise<SuperAdminResponse> {
    if ((!props.id && !props.email) || (props.id && props.email))
      throw new HttpError('Either id or email must be provided.', 400);

    let record: SuperAdmin | null = null;

    if (props.id)
      record = await this.repository.getOneById(new SuperAdminId(props.id));

    if (props.email)
      record = await this.repository.getOneByEmail(
        new SuperAdminEmail(props.email),
      );

    if (record === null) throw new SuperAdminNotFoundError();

    return record.toResponse();
  }
}
