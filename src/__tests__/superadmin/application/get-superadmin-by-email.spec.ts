import { HttpError } from '../../../lib/Shared/domain/exeptions';
import { GetOneSuperAdminByEmail } from '../../../lib/superadmin/application';
import { CreateSuperAdmin } from '../../../lib/superadmin/application/create-superadmin/create-superadmin';
import { SuperAdminRepository } from '../../../lib/superadmin/domain';
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

describe('Superadmin/application/get-one-superadmin-by-email', () => {
  let repository: SuperAdminRepository;
  let create: CreateSuperAdmin;
  let getByEmail: GetOneSuperAdminByEmail;

  beforeEach(async () => {
    repository = new InMemorySuperAdminRepository();
    create = new CreateSuperAdmin(repository);
    await create.handler(SuperAdmin1Mock);
    await create.handler(SuperAdmin2Mock);
    await create.handler(SuperAdmin3Mock);

    getByEmail = new GetOneSuperAdminByEmail(repository);
  });

  it('should get all superadmins', async () => {
    const result = await getByEmail.handler({
      email: 'superadmin2@domain.com',
    });

    expect(result).toBeDefined();
  });

  it('should throw when email not founded', async () => {
    await expect(
      getByEmail.handler({
        email: 'superadmin5@domain.com',
      }),
    ).rejects.toThrow(HttpError);
  });
});
