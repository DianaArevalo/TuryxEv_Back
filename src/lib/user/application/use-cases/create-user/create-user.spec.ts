import { CreateUserDTO, CreateUserUseCase } from './create-user';

import {
  HttpError,
  LimitValueObject,
  PageValueObject,
} from '~/lib/shared/domain';
import { UserRepositoryPort } from '~/lib/user/domain';
import { UserRepositoryInMemoryAdapter } from '~/lib/user/infrastructure/adapters';

describe('Create user - Use Case', () => {
  let repository: UserRepositoryPort;
  let userCreate: CreateUserUseCase;
  let baseUsers: CreateUserDTO[];

  beforeEach(async () => {
    repository = new UserRepositoryInMemoryAdapter();
    userCreate = new CreateUserUseCase(repository);

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

    for (const user of baseUsers) {
      await userCreate.execute(user);
    }
  });

  it('should have 3 users created before each test', async () => {
    const users = await repository.getAll(
      new PageValueObject(1),
      new LimitValueObject(10),
    );

    expect(users).toHaveLength(3);
  });

  it('should create users with proper providers', async () => {
    const users = await repository.getAll(
      new PageValueObject(1),
      new LimitValueObject(10),
    );

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

    await expect(userCreate.execute(invalidUser)).rejects.toBeInstanceOf(
      HttpError,
    );
  });
});
