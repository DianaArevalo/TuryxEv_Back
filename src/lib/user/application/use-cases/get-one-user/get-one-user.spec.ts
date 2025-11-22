import { GetOneUserUseCase } from './get-one-user';
import { CreateUserUseCase } from '../create-user/create-user';

import { HttpError } from '~/lib/shared/domain';
import { UserRepositoryPort, UserResponse } from '~/lib/user/domain';
import { UserRepositoryInMemoryAdapter } from '~/lib/user/infrastructure/adapters';

describe('Get one user - Use Case', () => {
  let repository: UserRepositoryPort;
  let userCreate: CreateUserUseCase;
  let getOneUser: GetOneUserUseCase;
  let existingUser: UserResponse;

  beforeEach(async () => {
    repository = new UserRepositoryInMemoryAdapter();
    userCreate = new CreateUserUseCase(repository);
    getOneUser = new GetOneUserUseCase(repository);

    existingUser = await userCreate.execute({
      name: 'Test User2',
      email: 'testuser2@example.com',
      providerData: 'AUTHGOOGLE',
    });
  });

  it('should return an existing user', async () => {
    const user = await getOneUser.execute({
      id: existingUser.idUser,
    });

    expect(user).toHaveProperty('idUser', existingUser.idUser);
    expect(user).toHaveProperty('name', existingUser.name);
    expect(user).toHaveProperty('email', existingUser.email);
  });

  it('should throw UserNotFoundError if user does not exist', async () => {
    await expect(
      getOneUser.execute({ id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(HttpError);
  });

  it('should return an existing user', async () => {
    const user = await getOneUser.execute({
      email: existingUser.email,
    });

    expect(user).toHaveProperty('idUser', existingUser.idUser);
    expect(user).toHaveProperty('name', existingUser.name);
    expect(user).toHaveProperty('email', existingUser.email);
    expect(user).toHaveProperty('providerData', existingUser.providerData);
  });

  it('should throw HttpError if user does not exist', async () => {
    await expect(
      getOneUser.execute({ email: 'non-existing@example.com' }),
    ).rejects.toBeInstanceOf(HttpError);
  });

  it('should throw an error when id and email are not provided', async () => {
    await expect(getOneUser.execute({})).rejects.toThrow(HttpError);
  });

  it('should throw an error when id and email are not provided', async () => {
    await expect(getOneUser.execute({})).rejects.toThrow(HttpError);
  });
});
