import { UseCase } from '~/lib/shared/application/usecase';
import {
  SuperAdmin,
  SuperAdminEmail,
  SuperAdminId,
  SuperAdminName,
  SuperAdminPassword,
  SuperAdminRepositoryPort,
  SuperAdminResponse,
} from '~/lib/superadmin/domain';

export interface CreateSuperAdminDTO {
  name: string;
  email: string;
  password: string;
}

export class CreateSuperAdminUseCase
  implements UseCase<CreateSuperAdminDTO, SuperAdminResponse>
{
  constructor(private readonly repository: SuperAdminRepositoryPort) {}

  async execute(props: CreateSuperAdminDTO): Promise<SuperAdminResponse> {
    const superAdmin = new SuperAdmin({
      superAdminId: new SuperAdminId(''),
      name: new SuperAdminName(props.name),
      email: new SuperAdminEmail(props.email),
      password: new SuperAdminPassword(props.password),
    });

    const created = await this.repository.create(superAdmin);

    return created.toResponse();
  }
}
