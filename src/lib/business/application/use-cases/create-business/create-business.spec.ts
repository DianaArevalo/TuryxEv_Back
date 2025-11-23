import { CreateBusinessUseCase } from './create-business';

import {
  BusinessRepositoryPort,
  LocationServicePort as BusinessLocationServicePort,
} from '~/lib/business/domain';
import { BusinessRepositoryInMemoryAdapter } from '~/lib/business/infrastructure/adapters/business-repository.in-memory.adapter';
import { LocationServiceAdapter as BusinessLocationServiceAdapter } from '~/lib/business/infrastructure/adapters/location-service.adapter';
import { LocationServicePort } from '~/lib/location/domain';
import { locationCompositionMock } from '~/lib/location/infrastructure/location.composition.mock';
import { HttpError } from '~/lib/shared/domain';

describe('Create business - Use Case', () => {
  let businessLocationService: BusinessLocationServicePort;
  let repository: BusinessRepositoryPort;
  let create: CreateBusinessUseCase;
  let locationService: LocationServicePort;

  beforeEach(() => {
    locationService = locationCompositionMock().locationService;

    businessLocationService = new BusinessLocationServiceAdapter(
      locationService,
    );
    repository = new BusinessRepositoryInMemoryAdapter(businessLocationService);
    create = new CreateBusinessUseCase(repository, businessLocationService);
  });

  it('Should create a business', async () => {
    const newBusiness = await create.execute({
      name: 'Business',
      email: 'new@business.com',
      idRole: 'BUSINESS',
      idPlan: 'FREE',
      status: 'OPEN',
      password: 'BusinessPa$$w0rd',
      location: {
        cityName: 'Bogotá',
        address: 'Some address',
      },
      picture: 'https://expressjs.com/images/favicon.png',
      providerData: 'AUTH',
    });

    expect(newBusiness.bussinessId).toBe('Business');
  });

  it('Should create a business when some data is not provided', async () => {
    const newBusiness = await create.execute({
      name: 'Business2',
      email: 'new@business.com',
      idRole: 'BUSINESS',
      status: 'OPEN',
      location: {
        cityName: 'Bogotá',
        address: 'Another address',
      },
      providerData: 'AUTHGOOGLE',
    });

    expect(newBusiness.bussinessId).toBe('Business2');
  });

  it('Should throw an error when password is not provided but providerData is AUTH', async () => {
    await expect(
      create.execute({
        name: 'Business',
        email: 'new@business.com',
        idRole: 'BUSINESS',
        idPlan: 'FREE',
        status: 'OPEN',
        location: {
          cityName: 'Bogotá',
          address: 'Some address',
        },
        picture: 'https://expressjs.com/images/favicon.png',
        providerData: 'AUTH',
      }),
    ).rejects.toThrow(HttpError);
  });

  it('Should throw an error when email is duplicated', async () => {
    await create.execute({
      name: 'Business2',
      email: 'new@business.com',
      idRole: 'BUSINESS',
      status: 'OPEN',
      location: {
        cityName: 'Bogotá',
        address: 'Another address',
      },
      providerData: 'AUTHGOOGLE',
    });

    await expect(
      create.execute({
        name: 'Business3',
        email: 'new@business.com',
        idRole: 'STAFF',
        status: 'OPEN',
        location: {
          cityName: 'Bogotá',
          address: 'Another address',
        },
        providerData: 'AUTHGOOGLE',
      }),
    ).rejects.toThrow(HttpError);
  });
});
