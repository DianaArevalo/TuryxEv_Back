import { SoftDeleteBusinessUseCase } from './soft-delete-business';
import { CreateBusinessUseCase } from '../create-business/create-business';

import {
  BusinessRepositoryPort,
  LocationServicePort as BusinessLocationServicePort,
  BusinessPrivateResponse,
  BusinessId,
} from '~/lib/business/domain';
import { BusinessRepositoryInMemoryAdapter } from '~/lib/business/infrastructure/adapters/business-repository.in-memory.adapter';
import { LocationServiceAdapter as BusinessLocationServiceAdapter } from '~/lib/business/infrastructure/adapters/location-service.adapter';
import { LocationServicePort } from '~/lib/location/domain';
import { locationCompositionMock } from '~/lib/location/infrastructure/location.composition.mock';
import { HttpError } from '~/lib/shared/domain';

describe('Soft delete business - Use Case', () => {
  let businessLocationService: BusinessLocationServicePort;
  let repository: BusinessRepositoryPort;
  let create: CreateBusinessUseCase;
  let softDelete: SoftDeleteBusinessUseCase;
  let locationService: LocationServicePort;
  let businessCreated: BusinessPrivateResponse;

  beforeEach(async () => {
    locationService = locationCompositionMock().locationService;

    businessLocationService = new BusinessLocationServiceAdapter(
      locationService,
    );
    repository = new BusinessRepositoryInMemoryAdapter(businessLocationService);
    create = new CreateBusinessUseCase(repository, businessLocationService);
    softDelete = new SoftDeleteBusinessUseCase(repository);

    businessCreated = await create.execute({
      name: 'Business',
      email: 'new@business.com',
      idRole: 'BUSINESS',
      idPlan: 'FREE',
      status: 'OPEN',
      password: 'BusinessPa$$w0rd',
      location: {
        cityName: 'Bogotá',
        address: 'Some address',
        lat: 10,
        lng: 10,
      },
      picture: 'https://expressjs.com/images/favicon.png',
      providerData: 'AUTH',
    });
  });

  it('should mark as delete a business', async () => {
    await softDelete.execute({
      id: businessCreated.bussinessId,
    });

    const deleted = await repository.getOneById(
      new BusinessId(businessCreated.bussinessId),
    );

    expect(deleted?.status.value).toBe('BLOCKED');
  });

  it('should throw an error when id is not found', async () => {
    await expect(() =>
      softDelete.execute({
        id: 'xxxxx',
      }),
    ).rejects.toThrow(HttpError);
  });
});
