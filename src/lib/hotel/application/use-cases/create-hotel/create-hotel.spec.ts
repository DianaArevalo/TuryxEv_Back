import { CreateHotelUseCase } from './create-hotel';

import {
  HotelRepositoryPort,
  LocationServicePort as HotelLocationServicePort,
  HotelLocation,
} from '~/lib/hotel/domain';
import { HotelRepositoryInMemoryAdapter } from '~/lib/hotel/infrastructure/adapters/hotel-repository.in-memory.adapter';
import { LocationServiceAdapter as HotelLocationServiceAdapter } from '~/lib/hotel/infrastructure/adapters/location-service.adapter';
import { LocationServicePort } from '~/lib/location/domain';
import { locationCompositionMock } from '~/lib/location/infrastructure/location.composition.mock';
import {
  HttpError,
  LimitValueObject,
  PageValueObject,
} from '~/lib/shared/domain';

describe('Create hotel - Use Case', () => {
  let hotelLocationService: HotelLocationServicePort;
  let repository: HotelRepositoryPort;
  let createHotel: CreateHotelUseCase;
  let locationService: LocationServicePort;

  beforeEach(() => {
    locationService = locationCompositionMock().locationService;
    hotelLocationService = new HotelLocationServiceAdapter(locationService);
    repository = new HotelRepositoryInMemoryAdapter();
    createHotel = new CreateHotelUseCase(repository, hotelLocationService);
  });

  it('should create a hotel and persist it', async () => {
    const props = {
      name: 'HOTELLASMARGARITAS',
      email: 'info@lasmargaritas.com',
      role: 'HOTEL',
      plan: 'FREE',
      status: 'OPEN',
      password: '$uperPassword159',
      location: {
        address: 'Some address',
        cityName: 'Bogotá',
        lat: 10,
        lng: 10,
      },
      providerData: 'AUTH',
    };

    await createHotel.execute(props);

    const hotels = await repository.getAll(
      new PageValueObject(1),
      new LimitValueObject(10),
    );

    expect(hotels).toHaveLength(1);
  });

  it('should create a hotel when password is not provided', async () => {
    const props = {
      name: 'Hotel 1',
      email: 'info@hotel1.com',
      role: 'HOTEL',
      plan: 'FREE',
      status: 'OPEN',
      location: {
        address: 'Other address',
        cityName: 'Bogotá',
        lat: 10,
        lng: 10,
      },
      providerData: 'AUTHGOOGLE',
    };

    await createHotel.execute(props);

    const hotels = await repository.getAll(
      new PageValueObject(1),
      new LimitValueObject(10),
    );

    expect(hotels).toHaveLength(1);
  });

  it('should create a hotel when email is duplicated', async () => {
    const props = {
      name: 'Hotel 1',
      email: 'info@hotel1.com',
      role: 'HOTEL',
      plan: 'FREE',
      status: 'OPEN',
      location: {
        address: 'Other address',
        cityName: 'Bogotá',
        lat: 10,
        lng: 10,
      },
      providerData: 'AUTHGOOGLE',
    };

    await createHotel.execute(props);
    await expect(createHotel.execute(props)).rejects.toThrow(HttpError);
  });

  it('should create a hotel when picture and freePlanExpiresAt is provided', async () => {
    const props = {
      name: 'Hotel 1',
      email: 'info@hotel1.com',
      role: 'HOTEL',
      plan: 'FREE',
      status: 'OPEN',
      password: '$uperPassword159',
      location: {
        address: 'Another address',
        cityName: 'Bogotá',
        lat: 10,
        lng: 10,
      },
      picture: 'https://worldvectorlogo.com/es/logo/expressjs',
      freePlanExpiresAt: new Date(Date.now() + 30 * 24 + 60 + 60 + 1000),
      providerData: 'AUTH',
    };

    await createHotel.execute(props);

    const hotels = await repository.getAll(
      new PageValueObject(1),
      new LimitValueObject(10),
    );

    expect(hotels).toHaveLength(1);
  });

  it("should throw an error when a password is not provided and providerData is from 'AUTH'", async () => {
    const props = {
      name: 'Hotel 1',
      email: 'info@hotel1.com',
      role: 'HOTEL',
      plan: 'FREE',
      status: 'OPEN',
      location: {
        address: 'X address',
        cityName: 'Bogotá',
        lat: 10,
        lng: 10,
      },
      providerData: 'AUTH',
    };

    await expect(createHotel.execute(props)).rejects.toBeInstanceOf(HttpError);
  });

  it('should throw an error when location is invalid', () => {
    // TODO: terminar test
    // const props = {
    //   name: 'Hotel 1',
    //   email: 'info@hotel1.com',
    //   idRole: 'HOTEL',
    //   idPlan: 'FREE',
    //   status: 'OPEN',
    //   password: '$uperPassword159',
    //   location: 'Any location',
    //   providerData: 'AUTH',
    // };

    expect(() =>
      HotelLocation.create({
        address: '',
        cityName: '',
        lat: 10,
        lng: 10,
      }),
    ).toThrow(HttpError);
  });
});
