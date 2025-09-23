import { UserDelete } from "~/lib/User/application/UserDelete/UserDelete";
import { User } from "~/lib/User/domain/User";
import { UserCreatedAt } from "~/lib/User/domain/UserCreatedAt";
import { UserEmail } from "~/lib/User/domain/UserEmail";
import { UserId } from "~/lib/User/domain/UserId";
import { UserName } from "~/lib/User/domain/UserName";
import { UserNotFoundError } from "~/lib/User/domain/UserNotFoundError";
import { UserPassword } from "~/lib/User/domain/UserPassword";
import { UserRepository } from "~/lib/User/domain/UserRepository";
import { UserUpdatedAt } from "~/lib/User/domain/UserUpdatedAt";
import { InMemoryUserRepository } from "~/lib/User/infrastructure/InMemoryUserRepository";

describe("application/UserDelete", () => {
  let repository: UserRepository;
  let userDelete: UserDelete;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    userDelete = new UserDelete(repository);
  });

  it("should delete an existing user", async () => {
    const user = new User(
      new UserId("123"),
      new UserName("Angel"),
      new UserEmail("test@example.com"),
      new UserPassword("Secret1234&"),
      new UserCreatedAt(new Date("2025-01-01T00:00:00Z")),
      new UserUpdatedAt(new Date("2025-01-01T00:00:00Z")),
      "CLIENT"
    );

    // lo guardamos en memoria
    await repository.create(user);

    // eliminar
    await userDelete.handle("123");

    // comprobar que ya no existe
    await expect(repository.getOneById(new UserId("123"))).resolves.toBeNull();
  });

  it("should throw UserNotFoundError if user does not exist", async () => {
    await expect(userDelete.handle("999")).rejects.toThrow(UserNotFoundError);
  });
});
