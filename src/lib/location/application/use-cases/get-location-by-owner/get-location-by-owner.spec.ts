import { GetLocationByOwnerUseCase } from './get-location-by-owner';
import { CreateLocationUseCase } from '../create-location/create-location';

import { LocationRepositoryPort } from '~/lib/location/domain';
import { LocationRepositoryInMemoryAdapter } from '~/lib/location/infrastructure/adapters';
import { HttpError } from '~/lib/shared/domain';

describe('get location by owner - Use Case', () => {
  let repository: LocationRepositoryPort;
  let createLocation: CreateLocationUseCase;
  let getLocationByOwner: GetLocationByOwnerUseCase;

  beforeEach(async () => {
    repository = new LocationRepositoryInMemoryAdapter();
    createLocation = new CreateLocationUseCase(repository);
    getLocationByOwner = new GetLocationByOwnerUseCase(repository);

    await createLocation.execute({
      address: 'Some address',
      cityName: 'Medellín',
      businessId: 'id',
      lat: 10,
      lng: 10,
    });

    await createLocation.execute({
      address: 'Other address',
      cityName: 'Bogotá',
      hotelId: 'id2',
      lat: 10,
      lng: 10,
    });

    await createLocation.execute({
      address: 'Another address',
      cityName: 'Cali',
      businessId: 'id3',
      lat: 10,
      lng: 10,
    });
  });

  it('Should get location by hotelId', async () => {
    const location = await getLocationByOwner.execute({
      ownerId: 'id2',
      ownerType: 'HOTEL',
    });

    expect(location.address).toBe('Other address');
  });

  it('Should get location by businessId', async () => {
    const location = await getLocationByOwner.execute({
      ownerId: 'id',
      ownerType: 'BUSINESS',
    });

    expect(location.address).toBe('Some address');
  });

  it('Should throw an error when ownerId not found', async () => {
    await expect(
      getLocationByOwner.execute({
        ownerId: 'xxxxx',
        ownerType: 'BUSINESS',
      }),
    ).rejects.toThrow(HttpError);
  });

  it('Should throw an error when ownerType not found', async () => {
    await expect(
      getLocationByOwner.execute({
        ownerId: 'id',
        ownerType: 'xxxxx',
      }),
    ).rejects.toThrow(HttpError);
  });
});
