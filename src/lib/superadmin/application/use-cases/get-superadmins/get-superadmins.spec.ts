import { GetSuperAdminsUseCase } from './get-superadmins';
import { CreateSuperAdminUseCase } from '../create-superadmin/create-superadmin';

import { SuperAdminRepositoryPort } from '~/lib/superadmin/domain';
import { SuperAdminRepositoryInMemoryAdapter } from '~/lib/superadmin/infrastructure/adapters';

describe('Get superadmins - Use Case', () => {
  let repository: SuperAdminRepositoryPort;
  let createSuperAdmin: CreateSuperAdminUseCase;
  let getSuperAdmins: GetSuperAdminsUseCase;

  beforeEach(async () => {
    repository = new SuperAdminRepositoryInMemoryAdapter();
    createSuperAdmin = new CreateSuperAdminUseCase(repository);
    getSuperAdmins = new GetSuperAdminsUseCase(repository);

    await createSuperAdmin.execute({
      name: 'Admin One',
      email: 'one@admin.com',
      password: 'Pass123!',
    });

    await createSuperAdmin.execute({
      name: 'Admin Two',
      email: 'two@admin.com',
      password: 'Pass456!',
    });
  });

  it('should return all superadmins if no filter is provided', async () => {
    const result = await getSuperAdmins.execute({});

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
  });

  it('should return only active superadmins when isActive = true', async () => {
    const result = await getSuperAdmins.execute({
      isActive: true,
    });

    result.forEach((admin) => {
      expect(admin.isActive).toBe(true);
    });
  });

  it('should return only inactive superadmins when isActive = false', async () => {
    const result = await getSuperAdmins.execute({
      isActive: false,
    });

    result.forEach((admin) => {
      expect(admin.isActive).toBe(false);
    });
  });

  it('should return empty array if no records match the filter', async () => {
    const result = await getSuperAdmins.execute({
      isActive: false,
    });

    expect(result).toEqual([]);
  });

  it('should return responses, not domain entities', async () => {
    const result = await getSuperAdmins.execute({});

    expect(result[0]).not.toHaveProperty('toResponse');
  });
});
