import { UserCreate, UserGetAllByStatus } from '~/lib/User/application';
import {
  UserEmail,
  UserStatus,
} from '~/lib/User/domain/entities/User/value-objects';
import { InMemoryUserRepository } from '~/lib/User/infrastructure/repositories/InMemoryUserRepository';

describe('application/UserGetAllByStatus', () => {
  let repository: InMemoryUserRepository;
  let userCreate: UserCreate;
  let userGetAllByStatus: UserGetAllByStatus;
  let activeUserEmail: string;
  let inactiveUserEmail: string;

  beforeEach(async () => {
    repository = new InMemoryUserRepository();
    userCreate = new UserCreate(repository);
    userGetAllByStatus = new UserGetAllByStatus(repository);

    activeUserEmail = 'active@example.com';
    inactiveUserEmail = 'inactive@example.com';

    // Crear usuario activo
    await userCreate.handler({
      name: 'Active User',
      email: activeUserEmail,
      password: 'Secret123!',
      providerData: 'AUTH',
    });

    // Crear usuario inactivo y modificar su estado
    await userCreate.handler({
      name: 'Inactive User',
      email: inactiveUserEmail,
      password: 'Secret123!',
      providerData: 'AUTH',
    });

    const inactiveEntity = await repository.getOneByEmail(
      UserEmail.create(inactiveUserEmail),
    );
    if (inactiveEntity) {
      inactiveEntity.status = new UserStatus(false);
      await repository.edit(inactiveEntity);
    }
  });

  it('should return only active and inactive users correctly', async () => {
    const activeUsers = await userGetAllByStatus.handler({ status: true });
    expect(activeUsers).toHaveLength(1);
    expect(activeUsers[0].email).toBe(activeUserEmail);

    const inactiveUsers = await userGetAllByStatus.handler({ status: false });
    expect(inactiveUsers).toHaveLength(1);
    expect(inactiveUsers[0].email).toBe(inactiveUserEmail);
  });

  it('should return empty array if no users match the status', async () => {
    // @ts-expect-error: intentionally passing invalid value for test
    const users = await userGetAllByStatus.handler({ status: null });
    expect(users).toEqual([]);
  });
});
