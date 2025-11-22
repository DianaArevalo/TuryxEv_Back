import { UseCase } from '~/lib/shared/application';
import {
  SuperAdmin,
  SuperAdminIsActive,
  SuperAdminRepositoryPort,
  SuperAdminResponse,
} from '~/lib/superadmin/domain';

export interface GetSuperAdminsDTO {
  isActive?: boolean;
}

export class GetSuperAdminsUseCase
  implements UseCase<GetSuperAdminsDTO, SuperAdminResponse[]>
{
  constructor(private readonly repository: SuperAdminRepositoryPort) {}

  async execute(props: GetSuperAdminsDTO): Promise<SuperAdminResponse[]> {
    let records: SuperAdmin[] | null = null;

    if (props.isActive !== undefined)
      records = await this.repository.getAllByIsActive(
        new SuperAdminIsActive(props.isActive),
      );

    if (!records) records = await this.repository.getAll();

    return records.map((record) => record.toResponse());
  }
}
