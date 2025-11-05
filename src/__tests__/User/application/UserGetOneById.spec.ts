import { HttpError } from "~/lib/Shared/domain";
import { UserCreate, UserGetOneById } from "~/lib/User/application";
import { InMemoryUserRepository } from "~/lib/User/infrastructure/repositories/InMemoryUserRepository";

describe("application/UserGetOneById", () => {
  let repository: InMemoryUserRepository;
  let userCreate: UserCreate;
  let userGetOneById: UserGetOneById;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    userCreate = new UserCreate(repository);
    userGetOneById = new UserGetOneById(repository);
  });

  it("should return an existing user", async () => {
    const createdUser = await userCreate.handler({
      name: "Test User",
      email: "testuser@example.com",
      password: "$uper$ecretPassword12!",
      providerData: "AUTH",
    });

    const user = await userGetOneById.handler({
      id: createdUser.idUser!,
    });

    expect(user).toHaveProperty("idUser", createdUser.idUser!);
    expect(user).toHaveProperty("name", createdUser.name);
    expect(user).toHaveProperty("email", createdUser.email);
  });

  it("should throw UserNotFoundError if user does not exist", async () => {
    try {
      await userGetOneById.handler({ id: "non-existing-id" });
      // Si llega aquí, la prueba falla
      fail("Expected UserNotFoundError to be thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(HttpError);
    }
  });
});
