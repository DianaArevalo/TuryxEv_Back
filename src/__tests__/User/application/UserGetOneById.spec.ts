import { HttpError } from '~/lib/Shared/domain';
import { UserCreate, UserGetOneById } from '~/lib/User/application';
import { InMemoryUserRepository } from '~/lib/User/infrastructure/repositories/InMemoryUserRepository';

describe('application/UserGetOneById', () => {
  let repository: InMemoryUserRepository;
  let userCreate: UserCreate;
  let userGetOneById: UserGetOneById;
  let existingUser: Awaited<ReturnType<typeof userCreate.handler>>;

  beforeEach(async () => {
    repository = new InMemoryUserRepository();
    userCreate = new UserCreate(repository);
    userGetOneById = new UserGetOneById(repository);

    // Creamos un usuario base antes de cada test
    existingUser = await userCreate.handler({
      name: 'Test User',
      email: 'testuser@example.com',
      password: '$uper$ecretPassword12!',
      providerData: 'AUTH',
    });
  });

  it('should return an existing user', async () => {
    const user = await userGetOneById.handler({
      id: existingUser.idUser!,
    });

    expect(user).toHaveProperty('idUser', existingUser.idUser);
    expect(user).toHaveProperty('name', existingUser.name);
    expect(user).toHaveProperty('email', existingUser.email);
  });

  it('should throw UserNotFoundError if user does not exist', async () => {
    await expect(
      userGetOneById.handler({ id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(HttpError);
  });
});
