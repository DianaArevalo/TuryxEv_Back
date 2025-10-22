import { SuperAdminRepository } from "../../domain";

export class GetAllSuperAdmins {
  constructor(private readonly repository: SuperAdminRepository) {}

  async handler() {
    const records = await this.repository.getAll();

    return records.map((record) => record.toResponse());
  }
}
