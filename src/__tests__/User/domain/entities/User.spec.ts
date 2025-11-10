import { User } from "~/lib/User/domain/entities/User/User";
import {
  UserCreatedAt,
  UserEmail,
  UserId,
  UserName,
  UserPassword,
  UserPlan,
  UserProvider,
  UserRole,
  UserScore,
  UserStatus,
  UserUpdatedAt,
} from "~/lib/User/domain/entities/User/value-objects";

describe("User entity", () => {
  const now = new Date();

  it("should create a user with a valid id and values", () => {
    // ✅ usamos un id genérico (sin Mongo)
    const fakeId = "user-1234567890abcdef123456";

    const user = new User({
      idUser: new UserId(fakeId),
      name: new UserName("Diana"),
      email: new UserEmail("diana@gmail.com"),
      password: new UserPassword("StrongPassw0rd$*.*"),
      plan: new UserPlan("FREE"),
      role: new UserRole("USER"),
      providerData: new UserProvider("AUTH"),
      status: new UserStatus(true),
      score: new UserScore(5),
      createdAt: new UserCreatedAt(now),
      updatedAt: new UserUpdatedAt(now),
    });

    expect(user.idUser?.value).toBe(fakeId);
    expect(typeof user.idUser?.value).toBe("string");
    expect(user.name.value).toBe("Diana");
    expect(user.email.value).toBe("diana@gmail.com");
    expect(user.status.value).toBe(true);
  });
});
