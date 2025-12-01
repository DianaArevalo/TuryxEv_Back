import { BlockHotelUseCase } from './block-hotel';
import { CreateHotelUseCase } from '../create-hotel/create-hotel';

import {
  HotelRepositoryPort,
  LocationServicePort as HotelLocationServicePort,
  HotelResponse,
  HotelId,
} from '~/lib/hotel/domain';
import { HotelRepositoryInMemoryAdapter } from '~/lib/hotel/infrastructure/adapters/hotel-repository.in-memory.adapter';
import { LocationServiceAdapter as HotelLocationServiceAdapter } from '~/lib/hotel/infrastructure/adapters/location-service.adapter';
import { LocationServicePort } from '~/lib/location/domain';
import { locationCompositionMock } from '~/lib/location/infrastructure/location.composition.mock';
import { HttpError } from '~/lib/shared/domain';

describe(' - Use Case', () => {
  let hotelLocationService: HotelLocationServicePort;
  let repository: HotelRepositoryPort;
  let createHotel: CreateHotelUseCase;
  let blockHotel: BlockHotelUseCase;
  let locationService: LocationServicePort;
  let hotelCreated: HotelResponse;

  beforeEach(async () => {
    locationService = locationCompositionMock().locationService;
    hotelLocationService = new HotelLocationServiceAdapter(locationService);
    repository = new HotelRepositoryInMemoryAdapter();
    createHotel = new CreateHotelUseCase(repository, hotelLocationService);
    blockHotel = new BlockHotelUseCase(repository);

    hotelCreated = await createHotel.execute({
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
    });
  });

  it('should block hotel', async () => {
    await blockHotel.execute({ id: hotelCreated.id });

    const hotel = await repository.getOneById(new HotelId(hotelCreated.id));

    expect(hotel).not.toBeNull();
  });

  it('should throw an error when hotel not found', async () => {
    await expect(blockHotel.execute({ id: 'xxx' })).rejects.toThrow(HttpError);
  });
});
