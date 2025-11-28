import { UserCreate, UserGetAllByStatus } from "~/lib/User/application";
import { UserEmail, UserStatus } from "~/lib/User/domain/entities/User/value-objects";
import { InMemoryUserRepository } from "~/lib/User/infrastructure/repositories/InMemoryUserRepository";

describe("application/UserGetAllByStatus", () => {
  let repository: InMemoryUserRepository;
  let userCreate: UserCreate;
  let userGetAllByStatus: UserGetAllByStatus;
  let activeUserEmail: string;
  let inactiveUserEmail: string;

  beforeEach(async () => {
    repository = new InMemoryUserRepository();
    userCreate = new UserCreate(repository);
    userGetAllByStatus = new UserGetAllByStatus(repository);

    activeUserEmail = "active@example.com";
    inactiveUserEmail = "inactive@example.com";

    // Crear usuario activo
    await userCreate.handler({
      name: "Active User",
      email: activeUserEmail,
      password: "Secret123!",
      providerData: "AUTH",
    });

    // Crear usuario inactivo
    await userCreate.handler({
      name: "Inactive User",
      email: inactiveUserEmail,
      password: "Secret123!",
      providerData: "AUTH",
    });

    // Obtener entidades creadas
    const activeEntity = await repository.getOneByEmail(UserEmail.create(activeUserEmail));
    const inactiveEntity = await repository.getOneByEmail(UserEmail.create(inactiveUserEmail));

    if (activeEntity) {
      activeEntity.status = new UserStatus(true);
      await repository.edit(activeEntity);
    }

    if (inactiveEntity) {
      inactiveEntity.status = new UserStatus(false);
      await repository.edit(inactiveEntity);
    }    
  });

  it("should return only active and inactive users correctly", async () => {
    const activeUsers = await userGetAllByStatus.handler({ status: true });
    console.log("Active users returned:", activeUsers);

    expect(activeUsers).toHaveLength(1);
    expect(activeUsers[0].email).toBe(activeUserEmail);

    const inactiveUsers = await userGetAllByStatus.handler({ status: false });
    console.log("Inactive users returned:", inactiveUsers);

    expect(inactiveUsers).toHaveLength(1);
    expect(inactiveUsers[0].email).toBe(inactiveUserEmail);
  });
});
