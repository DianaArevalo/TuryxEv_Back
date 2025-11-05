import { UserCreate, UserGetAllByStatus } from "~/lib/User/application";
import { UserEmail, UserStatus } from "~/lib/User/domain/entities/User/value-objects";
import { InMemoryUserRepository } from "~/lib/User/infrastructure/repositories/InMemoryUserRepository";

describe("application/UserGetAllByStatus", () => {
  let repository: InMemoryUserRepository;
  let userCreate: UserCreate;
  let userGetAllByStatus: UserGetAllByStatus;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    userCreate = new UserCreate(repository);
    userGetAllByStatus = new UserGetAllByStatus(repository);
  });

  it("should return only active and inactive users correctly", async () => {
    // Crear usuario activo (status por defecto true)
    await userCreate.handler({
      name: "Active User",
      email: "active@example.com",
      password: "Secret123!",
      providerData: "AUTH",
    });

    // Crear usuario inactivo (status por defecto true, luego se cambia)
    await userCreate.handler({
      name: "Inactive User",
      email: "inactive@example.com",
      password: "Secret123!",
      providerData: "AUTH",
    });

    // Modificar el status del usuario inactivo
    const inactiveEntity = await repository.getOneByEmail(UserEmail.create("inactive@example.com"));
    if (inactiveEntity) {
      inactiveEntity.status = new UserStatus(false);
      await repository.edit(inactiveEntity);
    }

    // Obtener usuarios activos
    const activeUsers = await userGetAllByStatus.handler({ status: true });
    expect(activeUsers).toHaveLength(1);
    expect(activeUsers[0].email).toBe("active@example.com");

    // Obtener usuarios inactivos
    const inactiveUsers = await userGetAllByStatus.handler({ status: false });
    expect(inactiveUsers).toHaveLength(1);
    expect(inactiveUsers[0].email).toBe("inactive@example.com");
  });

  it("should return empty array if no users match the status", async () => {
    const users = await userGetAllByStatus.handler({ status: null as any });
    expect(users).toEqual([]);
  });
});
