import { UserGetOneById } from "~/lib/User/application/UserGetOneById/UserGetOneById";
import { User } from "~/lib/User/domain/User";
import { UserCreatedAt } from "~/lib/User/domain/UserCreatedAt";
import { UserEmail } from "~/lib/User/domain/UserEmail";
import { UserId } from "~/lib/User/domain/UserId";
import { UserName } from "~/lib/User/domain/UserName";
import { UserPassword } from "~/lib/User/domain/UserPassword";
import { UserRepository } from "~/lib/User/domain/UserRepository";
import { UserNotFoundError } from "~/lib/User/domain/UserNotFoundError";
import { InMemoryUserRepository } from "~/lib/User/infrastructure/InMemoryUserRepository";
import { UserUpdatedAt } from "~/lib/User/domain/UserUpdatedAt";

describe("application/UserGetOneById", () => {
  let repository: UserRepository;
  let getOneById: UserGetOneById;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    getOneById = new UserGetOneById(repository);
  });

  it("should return an existing user", async () => {
    const user = new User(
      new UserId("123"),
      new UserName("Angel"),
      new UserEmail("test@example.com"),
      new UserPassword("Secret1234&"),
      new UserCreatedAt(new Date("2025-01-01T00:00:00Z")),
      new UserUpdatedAt(new Date("2025-01-01T00:00:00Z")),
      "CLIENT"
    );

    await repository.create(user);

    const found = await getOneById.handle("123");

    expect(found).toBeInstanceOf(User);
    expect(found.id).toEqual(new UserId("123"));
    expect(found.email.value).toBe("test@example.com");
  });

  it("should throw UserNotFoundError if user does not exist", async () => {
    await expect(getOneById.handle("999")).rejects.toThrow(UserNotFoundError);
  });
});
