import { CreateSuperAdmin } from "../../../lib/superadmin/application/create-superadmin/create-superadmin";
import { SuperAdminRepository } from "../../../lib/superadmin/domain";
import { InMemorySuperAdminRepository } from "../../../lib/superadmin/infrastructure/repositories/in-memory-superadmin-repository";
import { GetOneSuperAdminById } from "../../../lib/superadmin/application";
import { HttpError } from "../../../lib/Shared/domain/exeptions";

const SuperAdmin1Mock = {
  name: "SuperAdmin1",
  email: "superadmin1@domain.com",
  password: "$uperAdmin1",
};

const SuperAdmin2Mock = {
  name: "SuperAdmin2",
  email: "superadmin2@domain.com",
  password: "$uperAdmin2",
};

const SuperAdmin3Mock = {
  name: "SuperAdmin3",
  email: "superadmin3@domain.com",
  password: "$uperAdmin3",
};

describe("Superadmin/application/get-one-superadmin-by-id", () => {
  let repository: SuperAdminRepository;
  let create: CreateSuperAdmin;
  let getById: GetOneSuperAdminById;

  beforeEach(async () => {
    repository = new InMemorySuperAdminRepository();
    create = new CreateSuperAdmin(repository);
    await create.handler(SuperAdmin1Mock);
    await create.handler(SuperAdmin2Mock);
    await create.handler(SuperAdmin3Mock);

    getById = new GetOneSuperAdminById(repository);
  });

  it("should get one superadmin", async () => {
    const result = await getById.handler({
      id: "SuperAdmin2",
    });

    expect(result).toBeDefined();
  });

  it("should throw when id not founded", async () => {
    await expect(
      getById.handler({
        id: "SuperAdmin5",
      })
    ).rejects.toThrow(HttpError);
  });
});
