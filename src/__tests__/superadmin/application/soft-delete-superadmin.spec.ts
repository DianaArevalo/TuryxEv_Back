import { HttpError } from '../../../lib/Shared/domain/exeptions';
import { SoftDeleteSuperAdmin } from '../../../lib/superadmin/application';
import { CreateSuperAdmin } from '../../../lib/superadmin/application/create-superadmin/create-superadmin';
import {
  SuperAdminIsActive,
  SuperAdminRepository,
} from '../../../lib/superadmin/domain';
import { InMemorySuperAdminRepository } from '../../../lib/superadmin/infrastructure/repositories/in-memory-superadmin-repository';

const SuperAdmin1Mock = {
  name: 'SuperAdmin1',
  email: 'superadmin1@domain.com',
  password: '$uperAdmin1',
};

const SuperAdmin2Mock = {
  name: 'SuperAdmin2',
  email: 'superadmin2@domain.com',
  password: '$uperAdmin2',
};

const SuperAdmin3Mock = {
  name: 'SuperAdmin3',
  email: 'superadmin3@domain.com',
  password: '$uperAdmin3',
};

describe('Superadmin/application/soft-delete-superadmin', () => {
  let repository: SuperAdminRepository;
  let create: CreateSuperAdmin;
  let softDelete: SoftDeleteSuperAdmin;

  beforeEach(async () => {
    repository = new InMemorySuperAdminRepository();
    create = new CreateSuperAdmin(repository);
    await create.handler(SuperAdmin1Mock);
    await create.handler(SuperAdmin2Mock);
    await create.handler(SuperAdmin3Mock);
    softDelete = new SoftDeleteSuperAdmin(repository);
  });

  it('should inactive a superadmin', async () => {
    await softDelete.handler({ id: 'SuperAdmin1' });

    const result = await repository.getAllByIsActive(
      new SuperAdminIsActive(true),
    );

    expect(result).toHaveLength(2);
  });

  it('should throw a error when superadmin is not founded', async () => {
    await expect(softDelete.handler({ id: 'SuperAdmin5' })).rejects.toThrow(
      HttpError,
    );
  });
});
