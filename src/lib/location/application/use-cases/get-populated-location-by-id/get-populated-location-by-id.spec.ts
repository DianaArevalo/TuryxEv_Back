import { GetPopulatedLocationByIdUseCase } from './get-populated-location-by-id';
import {
  CreateLocationResponse,
  CreateLocationUseCase,
} from '../create-location/create-location';

import { LocationRepositoryPort } from '~/lib/location/domain';
import { LocationRepositoryInMemoryAdapter } from '~/lib/location/infrastructure/adapters';
import { HttpError } from '~/lib/Shared/domain';

describe('Get populated location by id - Use Case', () => {
  let repository: LocationRepositoryPort;
  let createLocation: CreateLocationUseCase;
  let getpopulatedLocationById: GetPopulatedLocationByIdUseCase;
  let location: CreateLocationResponse;

  beforeEach(async () => {
    repository = new LocationRepositoryInMemoryAdapter();
    createLocation = new CreateLocationUseCase(repository);
    getpopulatedLocationById = new GetPopulatedLocationByIdUseCase(repository);

    location = await createLocation.execute({
      address: 'Some address',
      cityName: 'Bogotá',
      businessId: 'id',
    });
  });

  it('Should get populated location by id', async () => {
    const populatedLocation = await getpopulatedLocationById.execute({
      id: location.id,
    });

    expect(populatedLocation.locationId).toBe(location.id);
    expect(populatedLocation.address).toBe('Some address');
    expect(populatedLocation.cityId).toBe('0');
    expect(populatedLocation.cityName).toBe('Bogotá');
  });

  it('Should throw an error when location not found', async () => {
    await expect(
      getpopulatedLocationById.execute({
        id: 'xxxxx',
      }),
    ).rejects.toThrow(HttpError);
  });
});
