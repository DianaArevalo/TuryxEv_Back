import { CreateSuperAdminUseCase } from './create-superadmin';

import { SuperAdminRepositoryPort } from '~/lib/superadmin/domain';
import { SuperAdminRepositoryInMemoryAdapter } from '~/lib/superadmin/infrastructure/adapters';

describe('Create superadmin - Use Case', () => {
  let repository: SuperAdminRepositoryPort;
  let createSuperAdmin: CreateSuperAdminUseCase;

  beforeEach(() => {
    repository = new SuperAdminRepositoryInMemoryAdapter();
    createSuperAdmin = new CreateSuperAdminUseCase(repository);
  });

  it('should create a superadmin', async () => {
    const superadmin = await createSuperAdmin.execute({
      name: 'Superadmin',
      email: 'super@admin.com',
      password: '$uperPassw0rd',
    });

    expect(superadmin.name).toBe('Superadmin');
  });
});
