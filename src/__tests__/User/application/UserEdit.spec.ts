import { HttpError } from "~/lib/Shared/domain";
import { UserCreate, UserEdit } from "~/lib/User/application";
import { InMemoryUserRepository } from "~/lib/User/infrastructure/repositories/InMemoryUserRepository";

describe("UserEdit application", () => {
  let repository: InMemoryUserRepository;
  let userCreate: UserCreate;
  let userEdit: UserEdit;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    userCreate = new UserCreate(repository);
    userEdit = new UserEdit(repository);
  });

  it("should edit user password if provider is AUTH", async () => {
  const createdUser = await userCreate.handler({
    name: "Angel",
    email: "angel@example.com",
    password: "Secret1234&",
    providerData: "AUTH",
  });

  // Llamamos al handler de edición
  await expect(
    userEdit.handler({
      userId: createdUser.idUser!,
      password: "NewSecret123!",
    })
  ).resolves.not.toThrow();

  // Verificamos directamente en el repository que el password cambió
  const userEntity = await repository.getOneById(
    { value: createdUser.idUser! } as any
  );
  expect(userEntity!.password!.value).not.toBe("Secret1234&");
});

  it("should throw HttpError if trying to update password for OAuth provider", async () => {
    const createdUser = await userCreate.handler({
      name: "GoogleUser",
      email: "google@example.com",
      providerData: "AUTHGOOGLE",
    });

    await expect(
      userEdit.handler({
        userId: createdUser.idUser!,
        password: "NewSecret123",
      })
    ).rejects.toBeInstanceOf(HttpError);
  });

  it("should throw HttpError if a USER tries to modify their own score", async () => {
    const createdUser = await userCreate.handler({
      name: "UserRoleUser",
      email: "user@example.com",
      password: "Secret1234&",
      providerData: "AUTH",
    });

    await expect(
      userEdit.handler({
        userId: createdUser.idUser!,
        score: 4,
        currentRole: "USER",
      })
    ).rejects.toBeInstanceOf(HttpError);
  });

  it("should update user picture, score, and status for allowed roles", async () => {
    const createdUser = await userCreate.handler({
      name: "Angel",
      email: "angel2@example.com",
      password: "Secret1234&",
      providerData: "AUTH",
    });

    const updated = await userEdit.handler({
      userId: createdUser.idUser!,
      picture: "newpic.png",
      score: 5,
      status: false,
      currentRole: "ADMIN",
    });

    expect(updated.picture).toBe("newpic.png");
    expect(updated.score).toBe(5);
    expect(updated.status).toBe(false);
  });
});