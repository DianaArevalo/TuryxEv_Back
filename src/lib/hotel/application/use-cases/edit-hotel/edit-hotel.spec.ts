import { EditHotelUseCase } from './edit-hotel';
import { CreateHotelUseCase } from '../create-hotel/create-hotel';

import {
  HotelRepositoryPort,
  LocationServicePort as HotelLocationServicePort,
  HotelResponse,
} from '~/lib/hotel/domain';
import { HotelRepositoryInMemoryAdapter } from '~/lib/hotel/infrastructure/adapters/hotel-repository.in-memory.adapter';
import { LocationServiceAdapter as HotelLocationServiceAdapter } from '~/lib/hotel/infrastructure/adapters/location-service.adapter';
import { LocationServicePort } from '~/lib/location/domain';
import { locationCompositionMock } from '~/lib/location/infrastructure/location.composition.mock';
import { HttpError } from '~/lib/shared/domain';

const Hotel1 = {
  name: 'Hotel 1',
  email: 'info@hotel1.com',
  role: 'HOTEL',
  plan: 'FREE',
  status: 'OPEN',
  password: '$uperPassword159',
  location: {
    address: 'Address',
    cityName: 'Bogotá',
  },
  providerData: 'AUTH',
};

const Hotel2 = {
  name: 'Hotel 2',
  email: 'info@hotel2.com',
  role: 'HOTEL',
  plan: 'FREE',
  status: 'OPEN',
  location: {
    address: 'Other address',
    cityName: 'Bogotá',
  },
  providerData: 'AUTHGOOGLE',
};

describe('Edit hotel - Use Case', () => {
  let hotelLocationService: HotelLocationServicePort;
  let repository: HotelRepositoryPort;
  let createHotel: CreateHotelUseCase;
  let locationService: LocationServicePort;

  let editHotel: EditHotelUseCase;
  let createdHotel: HotelResponse;
  let hotelId: string;

  beforeEach(async () => {
    locationService = locationCompositionMock().locationService;
    hotelLocationService = new HotelLocationServiceAdapter(locationService);
    repository = new HotelRepositoryInMemoryAdapter(hotelLocationService);
    createHotel = new CreateHotelUseCase(repository, hotelLocationService);
    editHotel = new EditHotelUseCase(repository, hotelLocationService);

    createdHotel = await createHotel.execute(Hotel1);
    hotelId = createdHotel.id;
  });

  it('should edit a hotel', async () => {
    const edit = {
      hotelId,
      name: 'Hotel 2',
      password: '$uperPassword555',
      location: {
        locationId: must(createdHotel.location?.locationId),
        address: 'X address',
        cityName: 'Medellín',
      },
      plan: 'BASIC',
      score: 5,
      picture: 'https://worldvectorlogo.com/es/logo/expressjs',
      status: 'CLOSED',
    };

    const edited = await editHotel.execute(edit);

    expect(edited.name).toBe('Hotel 2');
    expect(edited.location?.cityName).toBe('Medellín');
    expect(edited.plan).toBe('BASIC');
    expect(edited.score).toBe(5);
    expect(edited.picture).toBe(
      'https://worldvectorlogo.com/es/logo/expressjs',
    );
  });

  it('should edit when not data provided', async () => {
    const edit = {
      hotelId,
    };

    await editHotel.execute(edit);
  });

  it('should edit when password is the same', async () => {
    const edit = {
      hotelId,
      password: '$uperPassword159',
    };

    await editHotel.execute(edit);
  });

  it('should throw an error when location not exists', async () => {
    const edit = {
      hotelId,
      location: {
        locationId: must(createdHotel.location?.locationId),
        address: 'Any address',
        cityName: 'Any city',
      },
    };

    await expect(editHotel.execute(edit)).rejects.toBeInstanceOf(HttpError);
  });

  it('should throw an error when hotelId not found', async () => {
    const edit = {
      hotelId: 'id-not-found',
      name: 'Hotel 2',
    };

    await expect(editHotel.execute(edit)).rejects.toBeInstanceOf(HttpError);
  });

  it("should throw an error when password is provided and provider isn't 'AUTH'", async () => {
    // Creamos el hotel con un providerData diferente
    const created = await createHotel.execute(Hotel2);

    const edit = {
      hotelId: created.id,
      password: '$uperPassword555',
    };

    // 👇 Validamos que lance el error correcto
    await expect(editHotel.execute(edit)).rejects.toThrow(
      "Can't update password when you sign in with an external provider",
    );
  });
});

function must<T>(value: T | undefined): T {
  if (!value) throw new Error('Value should be defined in test');
  return value;
}
