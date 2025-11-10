import { HttpError } from '~/lib/Shared/domain';
import { UserCreate, UserSoftDelete } from '~/lib/User/application';
import { InMemoryUserRepository } from '~/lib/User/infrastructure/repositories/InMemoryUserRepository';

describe('application/UserSoftDelete', () => {
  let repository: InMemoryUserRepository;
  let userCreate: UserCreate;
  let userSoftDelete: UserSoftDelete;
  let existingUser: Awaited<ReturnType<typeof userCreate.handler>>;

  beforeEach(async () => {
    repository = new InMemoryUserRepository();
    userCreate = new UserCreate(repository);
    userSoftDelete = new UserSoftDelete(repository);

    // Creamos un usuario base
    existingUser = await userCreate.handler({
      name: 'Active User',
      email: 'active@example.com',
      password: 'Secret123!',
      providerData: 'AUTH',
    });
  });

  it('should soft delete an existing user (set status to false)', async () => {
    // Ejecutamos el soft delete sin esperar retorno
    await userSoftDelete.handler({ id: existingUser.idUser! });

    // Verificamos que el usuario en el repositorio cambió de estado
    const found = await repository.getOneById({
      value: existingUser.idUser!,
    });
    expect(found).not.toBeNull();
    expect(found!.status.value).toBe(false);
  });

  it('should throw UserNotFoundError if user does not exist', async () => {
    await expect(
      userSoftDelete.handler({ id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(HttpError);
  });
});
