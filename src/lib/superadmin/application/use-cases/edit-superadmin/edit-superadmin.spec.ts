import { EditSuperAdminUseCase } from './edit-superadmin';
import { CreateSuperAdminUseCase } from '../create-superadmin/create-superadmin';

import { HttpError } from '~/lib/shared/domain';
import {
  SuperAdminRepositoryPort,
  SuperAdminResponse,
} from '~/lib/superadmin/domain';
import { SuperAdminRepositoryInMemoryAdapter } from '~/lib/superadmin/infrastructure/adapters';

describe('Edit superadmin - Use Case', () => {
  let repository: SuperAdminRepositoryPort;
  let createSuperAdmin: CreateSuperAdminUseCase;
  let editSuperAdmin: EditSuperAdminUseCase;
  let userCreated: SuperAdminResponse;

  beforeEach(async () => {
    repository = new SuperAdminRepositoryInMemoryAdapter();
    createSuperAdmin = new CreateSuperAdminUseCase(repository);
    editSuperAdmin = new EditSuperAdminUseCase(repository);

    userCreated = await createSuperAdmin.execute({
      name: 'Superadmin',
      email: 'super@admin.com',
      password: '$uperPassw0rd',
    });
  });

  it('should throw error if superadmin does not exist', async () => {
    await expect(
      editSuperAdmin.execute({
        superAdminId: 'non-existent-id',
        name: 'Hacker',
      }),
    ).rejects.toBeInstanceOf(HttpError);
  });

  it('should edit name', async () => {
    const result = await editSuperAdmin.execute({
      superAdminId: userCreated.superAdminId,
      name: 'New Name',
    });

    expect(result.name).toBe('New Name');
  });

  it('should edit email', async () => {
    const result = await editSuperAdmin.execute({
      superAdminId: userCreated.superAdminId,
      email: 'new@mail.com',
    });

    expect(result.email).toBe('new@mail.com');
  });

  it('should edit password', async () => {
    const result = await editSuperAdmin.execute({
      superAdminId: userCreated.superAdminId,
      password: 'NewStrongPass123!',
    });

    expect(result).toBeDefined();
  });

  it('should edit permissions', async () => {
    const result = await editSuperAdmin.execute({
      superAdminId: userCreated.superAdminId,
      canCreateSuperUser: true,
      canEditUsers: true,
      canViewReservations: true,
      canBlockAccounts: true,
      canEditHotels: true,
      canEditBusiness: true,
    });

    expect(result.permissions.canCreateSuperUser).toBe(true);
    expect(result.permissions.canEditUsers).toBe(true);
    expect(result.permissions.canViewReservations).toBe(true);
    expect(result.permissions.canBlockAccounts).toBe(true);
    expect(result.permissions.canEditHotels).toBe(true);
    expect(result.permissions.canEditBusiness).toBe(true);
  });

  it('should edit last login date', async () => {
    const date = new Date();

    const result = await editSuperAdmin.execute({
      superAdminId: userCreated.superAdminId,
      lastLogin: date,
    });

    expect(result.lastLogin).toEqual(date);
  });

  it('should NOT override fields that were not sent', async () => {
    const original = userCreated;

    const result = await editSuperAdmin.execute({
      superAdminId: userCreated.superAdminId,
      name: 'Partial Update',
    });

    expect(result.name).toBe('Partial Update');
    expect(result.email).toBe(original.email);
  });
});
