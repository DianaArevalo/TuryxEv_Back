import { HttpError } from '~/lib/Shared/domain';
import { UserCreate, UserEdit } from '~/lib/User/application';
import { InMemoryUserRepository } from '~/lib/User/infrastructure/repositories/InMemoryUserRepository';

describe('UserEdit application', () => {
  let repository: InMemoryUserRepository;
  let userCreate: UserCreate;
  let userEdit: UserEdit;

  // Variables para reutilizar usuarios en los tests
  let authUser: Awaited<ReturnType<typeof userCreate.handler>>;
  let googleUser: Awaited<ReturnType<typeof userCreate.handler>>;
  let userRoleUser: Awaited<ReturnType<typeof userCreate.handler>>;

  beforeEach(async () => {
    repository = new InMemoryUserRepository();
    userCreate = new UserCreate(repository);
    userEdit = new UserEdit(repository);

    // Creamos los usuarios base antes de cada test
    authUser = await userCreate.handler({
      name: 'Angel',
      email: 'angel@example.com',
      password: 'Secret1234&',
      providerData: 'AUTH',
    });

    googleUser = await userCreate.handler({
      name: 'GoogleUser',
      email: 'google@example.com',
      providerData: 'AUTHGOOGLE',
    });

    userRoleUser = await userCreate.handler({
      name: 'UserRoleUser',
      email: 'user@example.com',
      password: 'Secret1234&',
      providerData: 'AUTH',
    });
  });

  it('should edit user password if provider is AUTH', async () => {
    await expect(
      userEdit.handler({
        userId: authUser.idUser!,
        password: 'NewSecret123!',
      }),
    ).resolves.not.toThrow();

    const userEntity = await repository.getOneById({
      value: authUser.idUser!,
    });
    expect(userEntity!.password!.value).not.toBe('Secret1234&');
  });

  it('should throw HttpError if trying to update password for OAuth provider', async () => {
    await expect(
      userEdit.handler({
        userId: googleUser.idUser!,
        password: 'NewSecret123',
      }),
    ).rejects.toBeInstanceOf(HttpError);
  });

  it('should throw HttpError if a USER tries to modify their own score', async () => {
    await expect(
      userEdit.handler({
        userId: userRoleUser.idUser!,
        score: 4,
        currentRole: 'USER',
      }),
    ).rejects.toBeInstanceOf(HttpError);
  });

  it('should update user picture, score, and status for allowed roles', async () => {
    const updated = await userEdit.handler({
      userId: authUser.idUser!,
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
