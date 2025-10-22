import {
  SuperAdmin,
  SuperAdminEmail,
  SuperAdminId,
  SuperAdminName,
  SuperAdminPassword,
  SuperAdminRepository,
} from "../../domain";

interface CreateSuperAdminHandlerProps {
  name: string;
  email: string;
  password: string;
}

export class CreateSuperAdmin {
  constructor(private readonly repository: SuperAdminRepository) {}

  async handler(props: CreateSuperAdminHandlerProps) {
    const superAdmin = new SuperAdmin({
      superAdminId: new SuperAdminId(""),
      name: new SuperAdminName(props.name),
      email: new SuperAdminEmail(props.email),
      password: new SuperAdminPassword(props.password),
    });

    const created = await this.repository.create(superAdmin);

    return created.toResponse();
  }
}
