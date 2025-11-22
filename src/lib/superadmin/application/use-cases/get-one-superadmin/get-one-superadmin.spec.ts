import { GetOneSuperAdminUseCase } from './get-one-superadmin';
import { CreateSuperAdminUseCase } from '../create-superadmin/create-superadmin';

import { HttpError } from '~/lib/shared/domain';
import {
  SuperAdminRepositoryPort,
  SuperAdminResponse,
} from '~/lib/superadmin/domain';
import { SuperAdminRepositoryInMemoryAdapter } from '~/lib/superadmin/infrastructure/adapters';

describe('Get one superadmin - Use Case', () => {
  let repository: SuperAdminRepositoryPort;
  let createSuperAdmin: CreateSuperAdminUseCase;
  let getOneSuperAdmin: GetOneSuperAdminUseCase;
  let userCreated: SuperAdminResponse;

  beforeEach(async () => {
    repository = new SuperAdminRepositoryInMemoryAdapter();
    createSuperAdmin = new CreateSuperAdminUseCase(repository);
    getOneSuperAdmin = new GetOneSuperAdminUseCase(repository);

    userCreated = await createSuperAdmin.execute({
      name: 'Superadmin',
      email: 'super@admin.com',
      password: '$uperPassw0rd',
    });
  });

  it('should throw error if NO id and NO email are provided', async () => {
    await expect(getOneSuperAdmin.execute({})).rejects.toBeInstanceOf(
      HttpError,
    );

    await expect(getOneSuperAdmin.execute({})).rejects.toMatchObject({
      statusCode: 400,
    });
  });

  it('should throw error if BOTH id and email are provided', async () => {
    await expect(
      getOneSuperAdmin.execute({
        id: userCreated.superAdminId,
        email: userCreated.email,
      }),
    ).rejects.toBeInstanceOf(HttpError);

    await expect(
      getOneSuperAdmin.execute({
        id: userCreated.superAdminId,
        email: userCreated.email,
      }),
    ).rejects.toMatchObject({ statusCode: 400 });
  });

  it('should throw SuperAdminNotFoundError if user does not exist by id', async () => {
    await expect(
      getOneSuperAdmin.execute({ id: 'non-existent-id' }),
    ).rejects.toBeInstanceOf(HttpError);
  });

  it('should throw SuperAdminNotFoundError if user does not exist by email', async () => {
    await expect(
      getOneSuperAdmin.execute({ email: 'ghost@mail.com' }),
    ).rejects.toBeInstanceOf(HttpError);
  });

  it('should get superadmin by id', async () => {
    const result = await getOneSuperAdmin.execute({
      id: userCreated.superAdminId,
    });

    expect(result).toBeDefined();
    expect(result.superAdminId).toBe(userCreated.superAdminId);
    expect(result.email).toBe(userCreated.email);
  });

  it('should get superadmin by email', async () => {
    const result = await getOneSuperAdmin.execute({
      email: userCreated.email,
    });

    expect(result).toBeDefined();
    expect(result.superAdminId).toBe(userCreated.superAdminId);
    expect(result.email).toBe(userCreated.email);
  });
});
