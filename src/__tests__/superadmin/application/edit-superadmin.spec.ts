import { SuperAdminRepository } from "../../../lib/superadmin/domain";
import { InMemorySuperAdminRepository } from "../../../lib/superadmin/infrastructure/repositories/in-memory-superadmin-repository";
import {
  CreateSuperAdmin,
  EditSuperAdmin,
} from "../../../lib/superadmin/application";
import { HttpError } from "../../../lib/Shared/domain/exeptions";

const SuperAdmin1Mock = {
  name: "SuperAdmin1",
  email: "superadmin1@domain.com",
  password: "$uperAdmin1",
};

describe("Superadmin/application/edit-superadmin", () => {
  let repository: SuperAdminRepository;
  let edit: EditSuperAdmin;
  let createdId: string;

  beforeEach(async () => {
    repository = new InMemorySuperAdminRepository();
    edit = new EditSuperAdmin(repository);

    createdId = (
      await new CreateSuperAdmin(repository).handler(SuperAdmin1Mock)
    ).superAdminId;
  });

  it("should edit a superadmin", async () => {
    const lastLogin = new Date(Date.now());
    const edited = await edit.handler({
      name: "Super Admin 1",
      email: "superadmin_1@domain.com",
      password: "$uperAdmin_1",
      superAdminId: createdId,
      canCreateSuperUser: true,
      canEditUsers: true,
      canViewReservations: true,
      canBlockAccounts: true,
      canEditHotels: true,
      canEditBusiness: true,
      lastLogin,
    });

    expect(edited.name).toBe("Super Admin 1");
    expect(edited.email).toBe("superadmin_1@domain.com");
    expect(edited.permissions.canCreateSuperUser).toBe(true);
    expect(edited.permissions.canEditUsers).toBe(true);
    expect(edited.permissions.canViewReservations).toBe(true);
    expect(edited.permissions.canBlockAccounts).toBe(true);
    expect(edited.permissions.canEditHotels).toBe(true);
    expect(edited.permissions.canEditBusiness).toBe(true);
    expect(edited.lastLogin).toBe(lastLogin);
  });

  it("should edit a superadmin when not change", async () => {
    const edited = await edit.handler({
      superAdminId: createdId,
    });

    expect(edited.name).toBe("SuperAdmin1");
    expect(edited.email).toBe("superadmin1@domain.com");
    expect(edited.permissions.canCreateSuperUser).toBe(false);
    expect(edited.permissions.canEditUsers).toBe(false);
    expect(edited.permissions.canViewReservations).toBe(false);
    expect(edited.permissions.canBlockAccounts).toBe(false);
    expect(edited.permissions.canEditHotels).toBe(false);
    expect(edited.permissions.canEditBusiness).toBe(false);
    expect(edited.lastLogin).toBe(undefined);
  });

  it("should throw a error when superadmin not found", async () => {
    expect(edit.handler({ superAdminId: "not-found" })).rejects.toThrow(
      HttpError
    );
  });
});
