import { SuperAdminId, SuperAdminRepository } from '../../domain';

interface SoftDeleteSuperAdminHandlerProps {
  id: string;
}

export class SoftDeleteSuperAdmin {
  constructor(private readonly repository: SuperAdminRepository) {}

  async handler(props: SoftDeleteSuperAdminHandlerProps) {
    await this.repository.softDelete(new SuperAdminId(props.id));
  }
}
