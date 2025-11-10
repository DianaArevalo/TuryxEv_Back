import { HttpError } from "~/lib/Shared/domain";
import { UserCreate, UserGetOneByEmail } from "~/lib/User/application";
import { InMemoryUserRepository } from "~/lib/User/infrastructure/repositories/InMemoryUserRepository";

describe("application/UserGetOneByEmail", () => {
  let repository: InMemoryUserRepository;
  let userCreate: UserCreate;
  let userGetOneByEmail: UserGetOneByEmail;
  let existingUser: any;

  beforeEach(async () => {
    repository = new InMemoryUserRepository();
    userCreate = new UserCreate(repository);
    userGetOneByEmail = new UserGetOneByEmail(repository);

    
    existingUser = await userCreate.handler({
      name: "Test User2",
      email: "testuser2@example.com",
      providerData: "AUTHGOOGLE",
    });
  });

  it("should return an existing user", async () => {
    const user = await userGetOneByEmail.handler({
      email: existingUser.email,
    });

    expect(user).toHaveProperty("idUser", existingUser.idUser!);
    expect(user).toHaveProperty("name", existingUser.name);
    expect(user).toHaveProperty("email", existingUser.email);
    expect(user).toHaveProperty("providerData", existingUser.providerData);
  });

  it("should throw HttpError if user does not exist", async () => {
    await expect(
      userGetOneByEmail.handler({ email: "non-existing@example.com" })
    ).rejects.toBeInstanceOf(HttpError);
  });
});
