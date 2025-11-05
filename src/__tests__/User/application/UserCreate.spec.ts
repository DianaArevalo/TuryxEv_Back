import { UserCreate } from "~/lib/User/application";
import { UserRepository } from "~/lib/User/domain/repositories";
import { InMemoryUserRepository } from "~/lib/User/infrastructure/repositories/InMemoryUserRepository";
import { User } from "~/lib/User/domain/entities/User/User";



describe("application/UserCreate", () => {
  let repository: UserRepository;
  let userCreate: UserCreate;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    userCreate = new UserCreate(repository);
  });

  it("should create a user with valid props", async () => {
    const props = {
      name: "Angel",
      email: "test@example.com",
      password: "Secret1234&$",
      role: "USER",
    };

    const response = await userCreate.handler(props);

    expect(response).toHaveProperty("idUser"); // se generará automáticamente
    expect(response.name).toBe(props.name);
    expect(response.email).toBe(props.email);
    expect(response.role).toBe(props.role);

    // Obtener usuario directamente desde el repo
    const createdUser = await repository.getOneByEmail({ value: props.email });
    expect(createdUser).toBeInstanceOf(User);
    expect(createdUser?.name.value).toBe(props.name);
    expect(createdUser?.email.value).toBe(props.email);
    expect(createdUser?.role.value).toBe(props.role);
  });

  it("should throw ValidationError if password is missing for AUTH provider", async () => {
    await expect(
      userCreate.handler({
        name: "Angel",
        email: "test2@example.com",
        // password omitted
      })
    ).rejects.toThrow("Password is required for AUTH");
  });
});
