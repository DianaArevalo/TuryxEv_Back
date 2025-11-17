import { GetOneBusinessUseCase } from './get-one-business';
import { CreateBusinessUseCase } from '../create-business/create-business';

import {
  BusinessRepositoryPort,
  LocationServicePort as BusinessLocationServicePort,
} from '~/lib/business/domain';
import { BusinessRepositoryInMemoryAdapter } from '~/lib/business/infrastructure/adapters/business-repository.in-memory.adapter';
import { LocationServiceAdapter as BusinessLocationServiceAdapter } from '~/lib/business/infrastructure/adapters/location-service.adapter';
import { LocationServicePort } from '~/lib/location/domain';
import { locationCompositionMock } from '~/lib/location/infrastructure/location.composition.mock';
import { HttpError } from '~/lib/Shared/domain';

const businesses = [
  {
    name: 'Alpha Foods',
    email: 'contact@alphafoods.com',
    idRole: 'BUSINESS',
    idPlan: 'FREE',
    status: 'OPEN',
    password: 'Alpha123!',
    location: { cityName: 'Bogotá', address: 'Av. Ciudad 45 #12-89' },
    picture: 'https://picsum.photos/200?random=1',
    providerData: 'AUTH',
  },
  {
    name: 'CodeHub Services',
    email: 'support@codehub.dev',
    idRole: 'STAFF',
    idPlan: 'PREMIUM',
    status: 'OPEN',
    password: 'StaffCode#1',
    location: { cityName: 'Cartagena', address: 'Calle Providencia 1023' },
    picture: 'https://picsum.photos/200?random=5',
    providerData: 'AUTH',
  },
];

describe('Get businesses - Use Case', () => {
  let businessLocationService: BusinessLocationServicePort;
  let repository: BusinessRepositoryPort;
  let create: CreateBusinessUseCase;
  let locationService: LocationServicePort;
  let getOnebusiness: GetOneBusinessUseCase;

  beforeEach(async () => {
    locationService = locationCompositionMock().locationService;

    businessLocationService = new BusinessLocationServiceAdapter(
      locationService,
    );
    repository = new BusinessRepositoryInMemoryAdapter(businessLocationService);
    create = new CreateBusinessUseCase(repository, businessLocationService);
    getOnebusiness = new GetOneBusinessUseCase(repository);

    await Promise.all(businesses.map((business) => create.execute(business)));
  });

  it('Should get a business by id', async () => {
    const record = await getOnebusiness.execute({ id: 'Alpha Foods' });

    expect(record).toBeDefined();
  });

  it('Should get a business by email', async () => {
    const record = await getOnebusiness.execute({
      email: 'support@codehub.dev',
    });

    expect(record).toBeDefined();
  });

  it('Should throw an error when id and email are provided', async () => {
    await expect(
      getOnebusiness.execute({
        id: 'Alpha Foods',
        email: 'support@codehub.dev',
      }),
    ).rejects.toThrow(HttpError);
  });

  it('Should throw an error when id or email is not provided', async () => {
    await expect(getOnebusiness.execute({})).rejects.toThrow(HttpError);
  });

  it('Should throw an error when id not found', async () => {
    await expect(getOnebusiness.execute({ id: 'xxxxx' })).rejects.toThrow(
      HttpError,
    );
  });

  it('Should throw an error when email not found', async () => {
    await expect(
      getOnebusiness.execute({ email: 'notfound@mail.com' }),
    ).rejects.toThrow(HttpError);
  });
});
