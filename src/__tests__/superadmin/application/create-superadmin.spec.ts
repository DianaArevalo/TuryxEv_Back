import { CreateSuperAdmin } from "../../../lib/superadmin/application/create-superadmin/create-superadmin";
import { SuperAdminRepository } from "../../../lib/superadmin/domain";
import { InMemorySuperAdminRepository } from "../../../lib/superadmin/infrastructure/repositories/in-memory-superadmin-repository";

describe("Superadmin/application/create-superadmin", () => {
  let repository: SuperAdminRepository;
  let create: CreateSuperAdmin;

  beforeEach(() => {
    repository = new InMemorySuperAdminRepository();
    create = new CreateSuperAdmin(repository);
  });

  it("should create a superadmin", async () => {
    const created = await create.handler({
      name: "SuperAdmin1",
      email: "superadmin1@domain.com",
      password: "$uperAdmin1",
    });

    expect(created.name).toBe("SuperAdmin1");
    expect(created.email).toBe("superadmin1@domain.com");
    expect(created.permissions.canCreateSuperUser).toBe(false);
    expect(created.permissions.canEditUsers).toBe(false);
    expect(created.permissions.canViewReservations).toBe(false);
    expect(created.permissions.canBlockAccounts).toBe(false);
    expect(created.permissions.canEditHotels).toBe(false);
    expect(created.permissions.canEditBusiness).toBe(false);
    expect(created.isActive).toBe(true);
    expect(created.lastLogin).toBeFalsy();
  });
});
