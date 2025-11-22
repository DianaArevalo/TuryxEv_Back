import { SoftDeleteSuperAdminUseCase } from './soft-delete-superadmin';
import { CreateSuperAdminUseCase } from '../create-superadmin/create-superadmin';

import {
  SuperAdminId,
  SuperAdminRepositoryPort,
  SuperAdminResponse,
} from '~/lib/superadmin/domain';
import { SuperAdminRepositoryInMemoryAdapter } from '~/lib/superadmin/infrastructure/adapters';

describe('Soft delete superadmin - Use Case', () => {
  let repository: SuperAdminRepositoryPort;
  let createSuperAdmin: CreateSuperAdminUseCase;
  let softDeleteSuperAdmin: SoftDeleteSuperAdminUseCase;
  let user: SuperAdminResponse;

  beforeEach(async () => {
    repository = new SuperAdminRepositoryInMemoryAdapter();
    createSuperAdmin = new CreateSuperAdminUseCase(repository);
    softDeleteSuperAdmin = new SoftDeleteSuperAdminUseCase(repository);

    user = await createSuperAdmin.execute({
      name: 'Admin',
      email: 'admin@test.com',
      password: 'Pass123!',
    });
  });

  it('should soft delete a superadmin', async () => {
    await expect(
      softDeleteSuperAdmin.execute({ id: user.superAdminId }),
    ).resolves.toBeUndefined();

    const deleted = await repository.getOneById(
      new SuperAdminId(user.superAdminId),
    );

    expect(deleted?.isActive.value).toBe(false);
  });

  it('should not throw error when deleting existing user', async () => {
    await expect(
      softDeleteSuperAdmin.execute({ id: user.superAdminId }),
    ).resolves.not.toThrow();
  });

  it('should keep other users intact', async () => {
    const user2 = await createSuperAdmin.execute({
      name: 'Second Admin',
      email: 'second@test.com',
      password: 'Pass456!',
    });

    await softDeleteSuperAdmin.execute({ id: user.superAdminId });

    const stillExists = await repository.getOneById(
      new SuperAdminId(user2.superAdminId),
    );

    expect(stillExists).not.toBeNull();
    expect(stillExists?.superAdminId.value).toBe(user2.superAdminId);
  });
});
