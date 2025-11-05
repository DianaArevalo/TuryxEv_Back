import { User } from "~/lib/User/domain/entities/User/User";
import { UserCreatedAt, UserEmail, UserId, UserName, UserPassword, UserPlan, UserProvider, UserRole, UserStatus, UserUpdatedAt } from "~/lib/User/domain/entities/User/value-objects";
import { ObjectId } from "mongodb";

describe("User entity", () => {
  const now = new Date();

  it("should create a user with a valid Mongo ObjectId", () => {
    const mongoId = new ObjectId().toString();

    const user = new User({
      idUser: new UserId(mongoId),
      name: new UserName("Diana"),
      email: new UserEmail("diana@gmail.com"),
      password: new UserPassword("StrongPassw0rd$*.*"),
      plan: new UserPlan("FREE"),
      role: new UserRole("USER"),
      providerData: new UserProvider("AUTH"),
      status: new UserStatus(true),
      createdAt: new UserCreatedAt(now),
      updatedAt: new UserUpdatedAt(now),
    });

    expect(user.idUser?.value).toBe(mongoId);
    expect(user.idUser?.value).toHaveLength(24); // longitud típica de ObjectId
  });
});



