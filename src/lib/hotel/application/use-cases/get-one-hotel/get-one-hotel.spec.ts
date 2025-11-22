import { GetOneHotelUseCase } from './get-one-hotel';
import { CreateHotelUseCase } from '../create-hotel/create-hotel';

import {
  HotelRepositoryPort,
  LocationServicePort as HotelLocationServicePort,
} from '~/lib/hotel/domain';
import { HotelRepositoryInMemoryAdapter } from '~/lib/hotel/infrastructure/adapters/hotel-repository.in-memory.adapter';
import { LocationServiceAdapter as HotelLocationServiceAdapter } from '~/lib/hotel/infrastructure/adapters/location-service.adapter';
import { LocationServicePort } from '~/lib/location/domain';
import { locationCompositionMock } from '~/lib/location/infrastructure/location.composition.mock';
import { HttpError } from '~/lib/shared/domain';

const hotels = [
  {
    name: 'Hotel 1',
    email: 'info@hotel1.com',
    role: 'HOTEL',
    plan: 'FREE',
    status: 'OPEN',
    password: '$uperPassword159',
    location: {
      address: 'Some address',
      cityName: 'Bogotá',
    },
    providerData: 'AUTH',
  },
  {
    name: 'Hotel 2',
    email: 'info@hotel2.com',
    role: 'HOTEL',
    plan: 'FREE',
    status: 'CLOSED',
    location: {
      address: 'Other address',
      cityName: 'Medellín',
    },
    providerData: 'AUTHGOOGLE',
  },
  {
    name: 'Hotel 3',
    email: 'info@hotel3.com',
    role: 'STAFF',
    plan: 'PREMIUM',
    status: 'OPEN',
    location: {
      address: 'Another address',
      cityName: 'Medellín',
    },
    providerData: 'AUTHGOOGLE',
  },
];

describe('Get one hotel - Use Case', () => {
  let hotelLocationService: HotelLocationServicePort;
  let repository: HotelRepositoryPort;
  let createHotel: CreateHotelUseCase;
  let locationService: LocationServicePort;
  let getOneHotel: GetOneHotelUseCase;

  beforeEach(async () => {
    locationService = locationCompositionMock().locationService;
    hotelLocationService = new HotelLocationServiceAdapter(locationService);
    repository = new HotelRepositoryInMemoryAdapter();
    createHotel = new CreateHotelUseCase(repository, hotelLocationService);
    getOneHotel = new GetOneHotelUseCase(repository);

    await Promise.all(hotels.map((hotel) => createHotel.execute(hotel)));
  });

  it('should get one business by email', async () => {
    const hotel = await getOneHotel.execute({
      email: 'info@hotel2.com',
    });

    expect(hotel).toBeTruthy();
  });

  it('should throw error when email is not found', async () => {
    await expect(
      getOneHotel.execute({
        email: 'info@hotelx.com',
      }),
    ).rejects.toThrow(HttpError);
  });

  it('should get one hotel by id', async () => {
    const hotel = await getOneHotel.execute({ id: '1' });

    expect(hotel).toBeTruthy();
    expect(hotel.name).toBe('Hotel 1');
  });

  it("should throw error when id isn't found", async () => {
    await expect(
      getOneHotel.execute({ id: 'non-existent-id' }),
    ).rejects.toThrow(HttpError);
  });

  it('should throw an error when id and email are not provided', async () => {
    await expect(getOneHotel.execute({})).rejects.toThrow(HttpError);
  });

  it('should throw an error when id and email are not provided', async () => {
    await expect(getOneHotel.execute({})).rejects.toThrow(HttpError);
  });
});
