import {
  HotelRepositoryPort,
  LocationServicePort as HotelLocationServicePort,
} from '~/lib/hotel/domain';
import { HotelRepositoryInMemoryAdapter } from '~/lib/hotel/infrastructure/adapters/hotel-repository.in-memory.adapter';
import { LocationServiceAdapter as HotelLocationServiceAdapter } from '~/lib/hotel/infrastructure/adapters/location-service.adapter';
import { LocationServicePort } from '~/lib/location/domain';
import { locationCompositionMock } from '~/lib/location/infrastructure/location.composition.mock';
import { CreateHotelUseCase } from '../create-hotel/create-hotel';
import { GetHotelsUseCase } from './get-hotels';

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

describe('Get hotels - Use Case', () => {
  let hotelLocationService: HotelLocationServicePort;
  let repository: HotelRepositoryPort;
  let createHotel: CreateHotelUseCase;
  let locationService: LocationServicePort;
  let getAllHotels: GetHotelsUseCase;

  beforeEach(async () => {
    locationService = locationCompositionMock().locationService;
    hotelLocationService = new HotelLocationServiceAdapter(locationService);
    repository = new HotelRepositoryInMemoryAdapter(hotelLocationService);
    createHotel = new CreateHotelUseCase(repository, hotelLocationService);
    getAllHotels = new GetHotelsUseCase(repository);

    await Promise.all(hotels.map((hotel) => createHotel.execute(hotel)));
  });

  it('should get all hotels', async () => {
    const hotels = await getAllHotels.execute({});

    expect(hotels).toHaveLength(3);
    expect(hotels[0].name).toBe('Hotel 1');
    expect(hotels[1].name).toBe('Hotel 2');
    expect(hotels[2].name).toBe('Hotel 3');
  });

  it('should get 1 hotel with pagination', async () => {
    const hotels = await getAllHotels.execute({
      page: 2,
      limit: 1,
    });

    expect(hotels).toHaveLength(1);
    expect(hotels[0].name).toBe('Hotel 2');
  });

  it('should get all FREE hotels', async () => {
    const hotels = await getAllHotels.execute({
      plan: 'FREE',
    });

    expect(hotels).toHaveLength(2);
    expect(hotels.every((h) => h.plan === 'FREE')).toBe(true);
  });

  it('should return empty array if plan not found', async () => {
    const hotels = await getAllHotels.execute({
      plan: 'PREMIUM',
    });

    expect(hotels).toHaveLength(1);
  });

  it('should get all by provider', async () => {
    const hotels = await getAllHotels.execute({
      providerData: 'AUTH',
    });

    expect(hotels).toHaveLength(1);
  });

  it('should get all by role', async () => {
    const hotels = await getAllHotels.execute({
      role: 'STAFF',
    });

    expect(hotels).toHaveLength(1);
  });

  it('should get all by status', async () => {
    const business = await getAllHotels.execute({
      status: 'OPEN',
      page: 1,
      limit: 10,
    });

    expect(business).toHaveLength(2);
  });
});
