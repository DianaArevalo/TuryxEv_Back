import { UserCreate } from "~/lib/User/application/UserCreate/UserCreate";
import { User } from "~/lib/User/domain/User";
import { UserCreatedAt } from "~/lib/User/domain/UserCreatedAt";
import { UserEmail } from "~/lib/User/domain/UserEmail";
import { UserId } from "~/lib/User/domain/UserId";
import { UserName } from "~/lib/User/domain/UserName";
import { UserPassword } from "~/lib/User/domain/UserPassword";
import { UserRepository } from "~/lib/User/domain/UserRepository";
import { InMemoryUserRepository } from "~/lib/User/infrastructure/InMemoryUserRepository";

describe("application/UserCreate", () => {
  let repository: UserRepository;
  let userCreate: UserCreate;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    userCreate = new UserCreate(repository);
  });

  it("should create a user", async () => {
    const now = new Date("2025-01-01T00:00:00Z");

    await userCreate.handler(
      "123",
      "Angel",
      "test@example.com",
      "Secret1234&",
      now,
      "CLIENT"
    );

    const userArg = (await repository.getOneById(new UserId("123"))) as User;
    expect(userArg).toBeInstanceOf(User);
    expect(userArg.id).toEqual(new UserId("123"));
    expect(userArg.name).toEqual(new UserName("Angel"));
    expect(userArg.email).toEqual(new UserEmail("test@example.com"));
    expect(userArg.password).toEqual(new UserPassword("Secret1234&"));
    expect(userArg.createdAt).toEqual(new UserCreatedAt(now));
    expect(userArg.role).toBe("CLIENT");
  });
});
