import { EditUserUseCase } from './edit-user';
import { CreateUserUseCase } from '../create-user/create-user';

import { HttpError } from '~/lib/shared/domain';
import { UserRepositoryPort, UserResponse } from '~/lib/user/domain';
import { UserRepositoryInMemoryAdapter } from '~/lib/user/infrastructure/adapters';

describe('Edir user - Use Case', () => {
  let repository: UserRepositoryPort;
  let userCreate: CreateUserUseCase;
  let userEdit: EditUserUseCase;

  let authUser: UserResponse;
  let googleUser: UserResponse;
  let userRoleUser: UserResponse;

  beforeEach(async () => {
    repository = new UserRepositoryInMemoryAdapter();
    userCreate = new CreateUserUseCase(repository);
    userEdit = new EditUserUseCase(repository);

    authUser = await userCreate.execute({
      name: 'Angel',
      email: 'angel@example.com',
      password: 'Secret1234&',
      providerData: 'AUTH',
    });

    googleUser = await userCreate.execute({
      name: 'GoogleUser',
      email: 'google@example.com',
      providerData: 'AUTHGOOGLE',
    });

    userRoleUser = await userCreate.execute({
      name: 'UserRoleUser',
      email: 'user@example.com',
      password: 'Secret1234&',
      providerData: 'AUTH',
    });
  });

  it('should edit user password if provider is AUTH', async () => {
    await expect(
      userEdit.execute({
        userId: authUser.idUser,
        password: 'NewSecret123!',
      }),
    ).resolves.not.toThrow();

    const userEntity = await repository.getOneById({
      value: authUser.idUser,
    });
    expect(userEntity!.password!.value).not.toBe('Secret1234&');
  });

  it('should throw HttpError if trying to update password for OAuth provider', async () => {
    await expect(
      userEdit.execute({
        userId: googleUser.idUser,
        password: 'NewSecret123',
      }),
    ).rejects.toBeInstanceOf(HttpError);
  });

  it('should throw HttpError if a USER tries to modify their own score', async () => {
    await expect(
      userEdit.execute({
        userId: userRoleUser.idUser,
        score: 4,
        currentRole: 'USER',
      }),
    ).rejects.toBeInstanceOf(HttpError);
  });

  it('should update user picture, score, and status for allowed roles', async () => {
    const updated = await userEdit.execute({
      userId: authUser.idUser,
      picture: 'newpic.png',
      score: 5,
      status: false,
      currentRole: 'ADMIN',
    });

    expect(updated.picture).toBe('newpic.png');
    expect(updated.score).toBe(5);
    expect(updated.status).toBe(false);
  });
});
