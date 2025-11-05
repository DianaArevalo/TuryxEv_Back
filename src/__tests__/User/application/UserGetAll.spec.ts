import { UserGetAll } from "~/lib/User/application";
import { UserCreate } from "~/lib/User/application/UserCreate/UserCreate";
import { InMemoryUserRepository } from "~/lib/User/infrastructure/repositories/InMemoryUserRepository";

describe("UserGetAll application", () => {
  let repository: InMemoryUserRepository;
  let userCreate: UserCreate;
  let userGetAll: UserGetAll;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    userCreate = new UserCreate(repository);
    userGetAll = new UserGetAll(repository);
  });

  it("should return all users", async () => {
    // Creamos 3 usuarios
    await userCreate.handler({ name: "Alice", email: "alice@example.com", password: "Secret1!", providerData: "AUTH" });
    await userCreate.handler({ name: "Bob", email: "bob@example.com", password: "Secret2!", providerData: "AUTH" });
    await userCreate.handler({ name: "Charlie", email: "charlie@example.com", password: "Secret3!", providerData: "AUTH" });

    const users = await userGetAll.handler({ page: 1, limit: 10 });

    expect(users).toHaveLength(3);
    expect(users.map(u => u.name)).toEqual(expect.arrayContaining(["Alice", "Bob", "Charlie"]));
  });

  it("should respect pagination", async () => {
    // Creamos 5 usuarios
    for (let i = 1; i <= 5; i++) {
      await userCreate.handler({
        name: `User${i}`,
        email: `user${i}@example.com`,
        password: `Secret${i}!`,
        providerData: "AUTH",
      });
    }

    // Página 1, 2 por página
    const page1 = await userGetAll.handler({ page: 1, limit: 2 });
    expect(page1).toHaveLength(2);
    expect(page1[0].name).toBe("User1");
    expect(page1[1].name).toBe("User2");

    // Página 2, 2 por página
    const page2 = await userGetAll.handler({ page: 2, limit: 2 });
    expect(page2).toHaveLength(2);
    expect(page2[0].name).toBe("User3");
    expect(page2[1].name).toBe("User4");
  });

  it("should use default page and limit if not provided", async () => {
    await userCreate.handler({ name: "Alice", email: "alice@example.com", password: "Secret1!", providerData: "AUTH" });

    const users = await userGetAll.handler({});
    expect(users).toHaveLength(1);
    expect(users[0].name).toBe("Alice");
  });
});