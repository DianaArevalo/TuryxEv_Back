import { UseCase } from '~/lib/shared/application';
import {
  SuperAdminId,
  SuperAdminRepositoryPort,
} from '~/lib/superadmin/domain';

export interface SoftDeleteSuperAdminDTO {
  id: string;
}

export class SoftDeleteSuperAdminUseCase
  implements UseCase<SoftDeleteSuperAdminDTO, void>
{
  constructor(private readonly repository: SuperAdminRepositoryPort) {}

  async execute(props: SoftDeleteSuperAdminDTO) {
    await this.repository.softDelete(new SuperAdminId(props.id));
  }
}
