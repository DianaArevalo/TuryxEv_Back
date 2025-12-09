import { GetBusinessesUseCase } from './get-businesses';
import { CreateBusinessUseCase } from '../create-business/create-business';

import {
  BusinessRepositoryPort,
  LocationServicePort as BusinessLocationServicePort,
} from '~/lib/business/domain';
import { BusinessRepositoryInMemoryAdapter } from '~/lib/business/infrastructure/adapters/business-repository.in-memory.adapter';
import { LocationServiceAdapter as BusinessLocationServiceAdapter } from '~/lib/business/infrastructure/adapters/location-service.adapter';
import { LocationServicePort } from '~/lib/location/domain';
import { locationCompositionMock } from '~/lib/location/infrastructure/location.composition.mock';

const businesses = [
  {
    name: 'Alpha Foods',
    email: 'contact@alphafoods.com',
    idRole: 'BUSINESS',
    idPlan: 'FREE',
    status: 'OPEN',
    password: 'Alpha123!',
    location: {
      cityName: 'Bogotá',
      address: 'Av. Ciudad 45 #12-89',
      lat: 10,
      lng: 10,
    },
    picture: 'https://picsum.photos/200?random=1',
    providerData: 'AUTH',
  },
  {
    name: 'TechNova',
    email: 'admin@technova.io',
    idRole: 'BUSINESS',
    idPlan: 'BASIC',
    status: 'OPEN',
    password: 'TechN0vaPa$$',
    location: {
      cityName: 'Medellín',
      address: 'Calle Reforma 221',
      lat: 10,
      lng: 10,
    },
    picture: 'https://picsum.photos/200?random=2',
    providerData: 'AUTHGOOGLE',
  },
  {
    name: 'Panadería La Ideal',
    email: 'ventas@laideal.pe',
    idRole: 'BUSINESS',
    idPlan: 'PREMIUM',
    status: 'OPEN',
    password: 'Pan1234$',
    location: {
      cityName: 'Cali',
      address: 'Av. Colonial 5483',
      lat: 10,
      lng: 10,
    },
    picture: 'https://picsum.photos/200?random=3',
    providerData: 'AUTH',
  },
  {
    name: 'Urban Fit Gym',
    email: 'info@urbanfit.com',
    idRole: 'BUSINESS',
    idPlan: 'BASIC',
    status: 'CLOSED',
    password: 'UrbanFit99!',
    location: {
      cityName: 'Barranquilla',
      address: 'Av. Libertador 765',
      lat: 10,
      lng: 10,
    },
    picture: 'https://picsum.photos/200?random=4',
    providerData: 'AUTHFACEBOOK',
  },
  {
    name: 'CodeHub Services',
    email: 'support@codehub.dev',
    idRole: 'STAFF',
    idPlan: 'PREMIUM',
    status: 'OPEN',
    password: 'StaffCode#1',
    location: {
      cityName: 'Cartagena',
      address: 'Calle Providencia 1023',
      lat: 10,
      lng: 10,
    },
    picture: 'https://picsum.photos/200?random=5',
    providerData: 'AUTH',
  },
];

describe('Get businesses - Use Case', () => {
  let businessLocationService: BusinessLocationServicePort;
  let repository: BusinessRepositoryPort;
  let create: CreateBusinessUseCase;
  let locationService: LocationServicePort;
  let getBusinesses: GetBusinessesUseCase;

  beforeEach(async () => {
    locationService = locationCompositionMock().locationService;

    businessLocationService = new BusinessLocationServiceAdapter(
      locationService,
    );
    repository = new BusinessRepositoryInMemoryAdapter(businessLocationService);
    create = new CreateBusinessUseCase(repository, businessLocationService);
    getBusinesses = new GetBusinessesUseCase(repository);

    await Promise.all(businesses.map((business) => create.execute(business)));
  });

  it('Should get businesses paginated', async () => {
    const records = await getBusinesses.execute({});

    expect(records).toHaveLength(5);
  });

  it('Should get businesses paginated with limit 2', async () => {
    const records = await getBusinesses.execute({ limit: 2 });

    expect(records).toHaveLength(2);
  });

  it('Should get businesses by plan', async () => {
    const records = await getBusinesses.execute({ plan: 'BASIC' });

    expect(records).toHaveLength(2);
  });

  it('Should get businesses by providerData', async () => {
    const records = await getBusinesses.execute({ providerData: 'AUTH' });

    expect(records).toHaveLength(3);
  });

  it('Should get businesses by role', async () => {
    const records = await getBusinesses.execute({ role: 'BUSINESS' });

    expect(records).toHaveLength(4);
  });

  it('Should get businesses by status', async () => {
    const records = await getBusinesses.execute({ status: 'OPEN' });

    expect(records).toHaveLength(4);
  });
});
