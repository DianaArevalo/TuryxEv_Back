import { SuperAdminIsActive, SuperAdminRepository } from '../../domain';

interface GetAllSuperAdminsByIsActiveHandlerProps {
  isActive: boolean;
}

export class GetAllSuperAdminsByIsActive {
  constructor(private readonly repository: SuperAdminRepository) {}

  async handler(props: GetAllSuperAdminsByIsActiveHandlerProps) {
    const records = await this.repository.getAllByIsActive(
      new SuperAdminIsActive(props.isActive),
    );

    return records.map((record) => record.toResponse());
  }
}
