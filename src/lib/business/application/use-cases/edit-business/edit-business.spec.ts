import { EditBusinessUseCase } from './edit-business';
import { CreateBusinessUseCase } from '../create-business/create-business';

import {
  BusinessRepositoryPort,
  LocationServicePort as BusinessLocationServicePort,
  BusinessId,
  Business,
  BusinessEmail,
  BusinessName,
  BusinessScore,
  BusinessCreatedAt,
  BusinessUpdatedAt,
  BusinessRole,
  BusinessPlan,
  BusinessStatus,
  BusinessProviderData,
} from '~/lib/business/domain';
import { BusinessRepositoryInMemoryAdapter } from '~/lib/business/infrastructure/adapters/business-repository.in-memory.adapter';
import { LocationServiceAdapter as BusinessLocationServiceAdapter } from '~/lib/business/infrastructure/adapters/location-service.adapter';
import { LocationServicePort } from '~/lib/location/domain';
import { locationCompositionMock } from '~/lib/location/infrastructure/location.composition.mock';
import { HttpError } from '~/lib/shared/domain';

describe('Edit business - Use Case', () => {
  let businessLocationService: BusinessLocationServicePort;
  let repository: BusinessRepositoryPort;
  let create: CreateBusinessUseCase;
  let edit: EditBusinessUseCase;
  let locationService: LocationServicePort;

  beforeEach(() => {
    locationService = locationCompositionMock().locationService;
    businessLocationService = new BusinessLocationServiceAdapter(
      locationService,
    );
    repository = new BusinessRepositoryInMemoryAdapter(businessLocationService);
    create = new CreateBusinessUseCase(repository, businessLocationService);
    edit = new EditBusinessUseCase(repository, businessLocationService);
  });

  it('Should edit a business', async () => {
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
        lat: 10,
        lng: 10,
      },
      picture: 'https://expressjs.com/images/favicon.png',
      providerData: 'AUTH',
    });

    const business = (await repository.getOneById(
      new BusinessId(newBusiness.bussinessId),
    ))!;

    await edit.execute({
      businessId: business.bussinessId.value,
      name: 'Business2',
      password: 'BusinessPa$$w0rd2',
      status: 'CLOSED',
      location: {
        // @ts-expect-error: intentionally passing an optional value for test
        locationId: business.location?.value.locationId,
        cityName: 'Medellín',
        address: 'Another address',
        lat: 10,
        lng: 10,
      },
      idPlan: 'BASIC',
      score: 3,
      picture: 'https://expressjs.com/images/favicon2.png',
    });
  });

  it('Should edit a business with minimal edit data', async () => {
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
        lat: 10,
        lng: 10,
      },
      picture: 'https://expressjs.com/images/favicon.png',
      providerData: 'AUTH',
    });

    const business = (await repository.getOneById(
      new BusinessId(newBusiness.bussinessId),
    ))!;

    await expect(
      edit.execute({
        businessId: business.bussinessId.value,
        location: {
          locationId: '',
          cityName: 'Medellín',
          address: 'Another address',
          lat: 10,
          lng: 10,
        },
      }),
    ).rejects.toThrow(HttpError);
  });

  it('Should edit a business without location', async () => {
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
        lat: 10,
        lng: 10,
      },
      picture: 'https://expressjs.com/images/favicon.png',
      providerData: 'AUTH',
    });

    const business = (await repository.getOneById(
      new BusinessId(newBusiness.bussinessId),
    ))!;

    await edit.execute({
      businessId: business.bussinessId.value,
    });
  });

  it('Should throw an error when password is provided but providerData is not AUTH', async () => {
    const newBusiness = await create.execute({
      name: 'Business',
      email: 'new@business.com',
      idRole: 'BUSINESS',
      idPlan: 'FREE',
      status: 'OPEN',
      location: {
        cityName: 'Bogotá',
        address: 'Some address',
        lat: 10,
        lng: 10,
      },
      picture: 'https://expressjs.com/images/favicon.png',
      providerData: 'AUTHGOOGLE',
    });

    const business = (await repository.getOneById(
      new BusinessId(newBusiness.bussinessId),
    ))!;

    await expect(
      edit.execute({
        businessId: business.bussinessId.value,
        password: 'BusinessPa$$w0rd',
      }),
    ).rejects.toThrow(HttpError);
  });

  it('Should throw an error when business not found', async () => {
    await expect(
      edit.execute({
        businessId: 'xxxxx',
        password: 'BusinessPa$$w0rd',
      }),
    ).rejects.toThrow(HttpError);
  });

  it('Should throw an error when business not found in repository', async () => {
    const createdAt = BusinessCreatedAt.now();

    await expect(
      repository.edit(
        new Business({
          bussinessId: new BusinessId('xxxx'),
          name: new BusinessName('Business'),
          email: new BusinessEmail('new@business.com'),
          score: BusinessScore.create(1),
          createdAt,
          updatedAt: BusinessUpdatedAt.now(createdAt),
          idRole: new BusinessRole('BUSINESS'),
          idPlan: new BusinessPlan('BASIC'),
          status: new BusinessStatus('OPEN'),
          providerData: new BusinessProviderData('AUTHGOOGLE'),
        }),
      ),
    ).rejects.toThrow(HttpError);
  });
});
