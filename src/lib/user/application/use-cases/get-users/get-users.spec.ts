import { GetUsersUseCase } from './get-users';
import { CreateUserDTO, CreateUserUseCase } from '../create-user/create-user';

import { UserId, UserRepositoryPort } from '~/lib/user/domain';
import { UserRepositoryInMemoryAdapter } from '~/lib/user/infrastructure/adapters';

describe('Get users - Use Case', () => {
  let repository: UserRepositoryPort;
  let userCreate: CreateUserUseCase;
  let getUsers: GetUsersUseCase;
  let baseUsers: CreateUserDTO[];

  beforeEach(async () => {
    repository = new UserRepositoryInMemoryAdapter();
    userCreate = new CreateUserUseCase(repository);
    getUsers = new GetUsersUseCase(repository);

    baseUsers = [
      {
        name: 'Alice',
        email: 'alice@example.com',
        password: 'Secret1!',
        providerData: 'AUTH',
      },
      {
        name: 'Bob',
        email: 'bob@example.com',
        password: 'Secret2!',
        providerData: 'AUTH',
      },
      {
        name: 'Charlie',
        email: 'charlie@example.com',
        password: 'Secret3!',
        providerData: 'AUTH',
      },
      {
        name: 'David',
        email: 'david@example.com',
        password: 'Secret4!',
        providerData: 'AUTH',
      },
      {
        name: 'Eve',
        email: 'eve@example.com',
        password: 'Secret5!',
        providerData: 'AUTH',
      },
    ];

    for (const user of baseUsers) {
      await userCreate.execute(user);
    }
  });

  it('should return all users', async () => {
    const users = await getUsers.execute({ page: 1, limit: 10 });

    expect(users).toHaveLength(5);
    expect(users.map((u) => u.name)).toEqual(
      expect.arrayContaining(['Alice', 'Bob', 'Charlie', 'David', 'Eve']),
    );
  });

  it('should respect pagination', async () => {
    // Página 1, 2 usuarios por página
    const page1 = await getUsers.execute({ page: 1, limit: 2 });
    expect(page1).toHaveLength(2);
    expect(page1[0].name).toBe('Alice');
    expect(page1[1].name).toBe('Bob');

    // Página 2, 2 usuarios por página
    const page2 = await getUsers.execute({ page: 2, limit: 2 });
    expect(page2).toHaveLength(2);
    expect(page2[0].name).toBe('Charlie');
    expect(page2[1].name).toBe('David');
  });

  it('should use default page and limit if not provided', async () => {
    const users = await getUsers.execute({});
    expect(users.length).toBeGreaterThan(0);
    expect(users[0].name).toBeDefined();
  });

  it('should return only active and inactive users correctly', async () => {
    const activeUsers = await getUsers.execute({
      status: true,
    });
    expect(activeUsers).toHaveLength(5);

    await repository.softDelete(new UserId('Bob'));

    const inactiveUsers = await getUsers.execute({ status: false });
    expect(inactiveUsers).toHaveLength(1);
    expect(inactiveUsers[0].email).toBe('bob@example.com');
  });
});
