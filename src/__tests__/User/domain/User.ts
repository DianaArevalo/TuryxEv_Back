import { User } from "~/lib/User/domain/User";
import { UserCreatedAt } from "~/lib/User/domain/UserCreatedAt";
import { UserEmail } from "~/lib/User/domain/UserEmail";
import { UserId } from "~/lib/User/domain/UserId";
import { UserName } from "~/lib/User/domain/UserName";
import { UserPassword } from "~/lib/User/domain/UserPassword";
import { UserStatus } from "~/lib/User/domain/UserStatus";
import { UserUpdatedAt } from "~/lib/User/domain/UserUpdatedAt";

describe("domain/User", () => {
  let user: User;
  const now = new Date();

  beforeEach(() => {
    user = new User(
      new UserId("id"),
      new UserName("name"),
      new UserEmail("email@gmail.com"),
      new UserPassword("$trongPassw0rd"),
      new UserCreatedAt(now),
      new UserUpdatedAt(now),
      "CLIENT",
      new UserStatus(true)
    );
  });

  it("should be desactive user", () => {
    user.desactivate();

    expect(user.status).toBe(false);
  });

  it("should be active user", () => {
    user.desactivate();
    user.activate();

    expect(user.status).toBe(true);
  });
});
