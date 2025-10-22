import {
  SuperAdminId,
  SuperAdminNotFoundError,
  SuperAdminRepository,
} from "../../domain";

interface GetOneSuperAdminByIdHandlerProps {
  id: string;
}

export class GetOneSuperAdminById {
  constructor(private readonly repository: SuperAdminRepository) {}

  async handler(props: GetOneSuperAdminByIdHandlerProps) {
    const record = await this.repository.getOneById(new SuperAdminId(props.id));

    if (!record) throw new SuperAdminNotFoundError();

    return record.toResponse();
  }
}
