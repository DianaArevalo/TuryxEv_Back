import { UserCreate } from "~/lib/User/application";
import { UserRepository } from "~/lib/User/domain/repositories";
import { InMemoryUserRepository } from "~/lib/User/infrastructure/repositories/InMemoryUserRepository";
import { User } from "~/lib/User/domain/entities/User/User";
import { HttpError, Limit, Page } from "~/lib/Shared/domain";



describe("User/application/UserCreate", () => {
  let repository: UserRepository;
  let userCreate: UserCreate;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    userCreate = new UserCreate(repository);
  });

  it("should create a user with AUTH provider and password", async () => {
    const props = {
      name: "Angel",
      email: "angel@example.com",
      password: "Secret1234&",
      providerData: "AUTH",
      role: "USER",
    };

    await userCreate.handler(props);

    const users = await repository.getAll(new Page(1), new Limit(10));
    expect(users).toHaveLength(1);

    const user = users[0] as User;
    expect(user).toBeInstanceOf(User);
    expect(user.name.value).toBe(props.name);
    expect(user.email.value).toBe(props.email);
    expect(user.role.value).toBe(props.role);
  });

  it("should create a user with AUTHGOOGLE provider without password", async () => {
    const props = {
      name: "Pitin Nene",
      email: "pitin@gmail.com",
      providerData: "AUTHGOOGLE",
      role: "USER",
    };

    await userCreate.handler(props);

    const users = await repository.getAll(new Page(1), new Limit(10));
    expect(users).toHaveLength(1);

    const user = users[0] as User;
    expect(user).toBeInstanceOf(User);
    expect(user.providerData.value).toBe("AUTHGOOGLE");
    expect(user.password).toBeUndefined();
  });

  it("should create a user with AUTHFACEBOOK provider without password", async () => {
    const props = {
      name: "FB User",
      email: "fbuser@gmail.com",
      providerData: "AUTHFACEBOOK",
      role: "USER",
    };

    await userCreate.handler(props);

    const users = await repository.getAll(new Page(1), new Limit(10));
    expect(users).toHaveLength(1);

    const user = users[0] as User;
    expect(user).toBeInstanceOf(User);
    expect(user.providerData.value).toBe("AUTHFACEBOOK");
    expect(user.password).toBeUndefined();
  });

  it("should throw ValidationError when AUTH provider without password", async () => {
    const props = {
      name: "NoPass",
      email: "nopass@gmail.com",
      providerData: "AUTH",
      role: "USER",
    };

    await expect(userCreate.handler(props)).rejects.toBeInstanceOf(HttpError);
  });
});
