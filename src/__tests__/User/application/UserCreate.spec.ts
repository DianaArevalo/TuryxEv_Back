import { HttpError, Limit, Page } from '~/lib/Shared/domain';
import { UserCreate, UserCreateProps } from '~/lib/User/application';
import { UserRepository } from '~/lib/User/domain/repositories';
import { InMemoryUserRepository } from '~/lib/User/infrastructure/repositories/InMemoryUserRepository';

describe('User/application/UserCreate', () => {
  let repository: UserRepository;
  let userCreate: UserCreate;
  let baseUsers: UserCreateProps[];

  beforeEach(async () => {
    repository = new InMemoryUserRepository();
    userCreate = new UserCreate(repository);

    baseUsers = [
      {
        name: 'Angel',
        email: 'angel@example.com',
        password: 'Secret1234&',
        providerData: 'AUTH',
        role: 'USER',
      },
      {
        name: 'Pitin Nene',
        email: 'pitin@gmail.com',
        providerData: 'AUTHGOOGLE',
        role: 'USER',
      },
      {
        name: 'FB User',
        email: 'fbuser@gmail.com',
        providerData: 'AUTHFACEBOOK',
        role: 'USER',
      },
    ];

    // Crear usuarios base antes de cada test
    for (const props of baseUsers) {
      await userCreate.handler(props);
    }
  });

  it('should have 3 users created before each test', async () => {
    const users = await repository.getAll(new Page(1), new Limit(10));
    expect(users).toHaveLength(3);
  });

  it('should create users with proper providers', async () => {
    const users = await repository.getAll(new Page(1), new Limit(10));

    expect(users[0].providerData.value).toBe('AUTH');
    expect(users[1].providerData.value).toBe('AUTHGOOGLE');
    expect(users[2].providerData.value).toBe('AUTHFACEBOOK');
  });

  it('should throw ValidationError when AUTH provider without password', async () => {
    const invalidUser = {
      name: 'NoPass',
      email: 'nopass@gmail.com',
      providerData: 'AUTH',
      role: 'USER',
    };

    await expect(userCreate.handler(invalidUser)).rejects.toBeInstanceOf(
      HttpError,
    );
  });
});
