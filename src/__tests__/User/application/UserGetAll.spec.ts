import { UserGetAll } from "~/lib/User/application";
import { UserCreate } from "~/lib/User/application/UserCreate/UserCreate";
import { InMemoryUserRepository } from "~/lib/User/infrastructure/repositories/InMemoryUserRepository";

describe("UserGetAll application", () => {
  let repository: InMemoryUserRepository;
  let userCreate: UserCreate;
  let userGetAll: UserGetAll;
  let baseUsers: any[];

  beforeEach(async () => {
    repository = new InMemoryUserRepository();
    userCreate = new UserCreate(repository);
    userGetAll = new UserGetAll(repository);

    // Usuarios base que se crearán antes de cada test
    baseUsers = [
      { name: "Alice", email: "alice@example.com", password: "Secret1!", providerData: "AUTH" },
      { name: "Bob", email: "bob@example.com", password: "Secret2!", providerData: "AUTH" },
      { name: "Charlie", email: "charlie@example.com", password: "Secret3!", providerData: "AUTH" },
      { name: "David", email: "david@example.com", password: "Secret4!", providerData: "AUTH" },
      { name: "Eve", email: "eve@example.com", password: "Secret5!", providerData: "AUTH" },
    ];

    // Creamos los usuarios base antes de cada test
    for (const user of baseUsers) {
      await userCreate.handler(user);
    }
  });

  it("should return all users", async () => {
    const users = await userGetAll.handler({ page: 1, limit: 10 });

    expect(users).toHaveLength(5);
    expect(users.map(u => u.name)).toEqual(
      expect.arrayContaining(["Alice", "Bob", "Charlie", "David", "Eve"])
    );
  });

  it("should respect pagination", async () => {
    // Página 1, 2 usuarios por página
    const page1 = await userGetAll.handler({ page: 1, limit: 2 });
    expect(page1).toHaveLength(2);
    expect(page1[0].name).toBe("Alice");
    expect(page1[1].name).toBe("Bob");

    // Página 2, 2 usuarios por página
    const page2 = await userGetAll.handler({ page: 2, limit: 2 });
    expect(page2).toHaveLength(2);
    expect(page2[0].name).toBe("Charlie");
    expect(page2[1].name).toBe("David");
  });

  it("should use default page and limit if not provided", async () => {
    const users = await userGetAll.handler({});
    expect(users.length).toBeGreaterThan(0);
    expect(users[0].name).toBeDefined();
  });
});
