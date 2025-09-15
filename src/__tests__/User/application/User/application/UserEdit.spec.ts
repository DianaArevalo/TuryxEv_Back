import { UserEdit } from "~/lib/User/application/UserEdit/UserEdit";
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

describe("application/UserEdit", () => {
  let repository: UserRepository;
  let userEdit: UserEdit;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    userEdit = new UserEdit(repository);
  });

  it("should edit an existing user", async () => {
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

    await userEdit.handle(
      "123",
      "UpdatedName",
      "updated@example.com",
      new Date("2025-02-01T00:00:00Z"),
      "NewPass123&"
    );

    const updatedUser = await repository.getOneById(new UserId("123"));

    expect(updatedUser).not.toBeNull();
    expect(updatedUser!.name.value).toBe("UpdatedName");
    expect(updatedUser!.email.value).toBe("updated@example.com");
    expect(updatedUser!.role).toBe("CLIENT");
  });

  it("should throw UserNotFoundError if user does not exist", async () => {
    await expect(
      userEdit.handle(
        "999",
        "DoesNotExist",
        "none@example.com",
        new Date(),
        "Fake123&"
      )
    ).rejects.toThrow(UserNotFoundError);
  });

  it("should throw error if email is invalid", async () => {
    const user = new User(
      new UserId("321"),
      new UserName("Maria"),
      new UserEmail("maria@example.com"),
      new UserPassword("Secret1234&"),
      new UserCreatedAt(new Date("2025-01-01T00:00:00Z")),
      new UserUpdatedAt(new Date("2025-01-01T00:00:00Z")),
      "CLIENT"
    );

    await repository.create(user);

    await expect(
      userEdit.handle(
        "321",
        "Maria",
        "invalid-email",
        new Date(),
        "Secret1234&"
      )
    ).rejects.toThrow("UserEmail must be a valid email address");
  });
});
