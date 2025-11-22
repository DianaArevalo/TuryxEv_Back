import { SoftDeleteUserUseCase } from './soft-delete-user';
import { CreateUserUseCase } from '../create-user/create-user';

import { HttpError } from '~/lib/shared/domain';
import { UserRepositoryPort, UserResponse } from '~/lib/user/domain';
import { UserRepositoryInMemoryAdapter } from '~/lib/user/infrastructure/adapters';

describe('Soft delete user - Use Case', () => {
  let repository: UserRepositoryPort;
  let userCreate: CreateUserUseCase;
  let userSoftDelete: SoftDeleteUserUseCase;
  let existingUser: UserResponse;

  beforeEach(async () => {
    repository = new UserRepositoryInMemoryAdapter();
    userCreate = new CreateUserUseCase(repository);
    userSoftDelete = new SoftDeleteUserUseCase(repository);

    existingUser = await userCreate.execute({
      name: 'Active User',
      email: 'active@example.com',
      password: 'Secret123!',
      providerData: 'AUTH',
    });
  });

  it('should soft delete an existing user (set status to false)', async () => {
    // Ejecutamos el soft delete sin esperar retorno
    await userSoftDelete.execute({ id: existingUser.idUser });

    // Verificamos que el usuario en el repositorio cambió de estado
    const found = await repository.getOneById({
      value: existingUser.idUser,
    });
    expect(found).not.toBeNull();
    expect(found!.status.value).toBe(false);
  });

  it('should throw UserNotFoundError if user does not exist', async () => {
    await expect(
      userSoftDelete.execute({ id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(HttpError);
  });
});
