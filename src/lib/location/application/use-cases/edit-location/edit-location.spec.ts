import { EditLocationUseCase } from './edit-location';
import {
  CreateLocationResponse,
  CreateLocationUseCase,
} from '../create-location/create-location';

import { LocationId, LocationRepositoryPort } from '~/lib/location/domain';
import { LocationRepositoryInMemoryAdapter } from '~/lib/location/infrastructure/adapters';
import { HttpError } from '~/lib/Shared/domain';

describe('Edit Location - Use Case', () => {
  let repository: LocationRepositoryPort;
  let createLocation: CreateLocationUseCase;
  let editLocation: EditLocationUseCase;
  let location: CreateLocationResponse;

  beforeEach(async () => {
    repository = new LocationRepositoryInMemoryAdapter();
    createLocation = new CreateLocationUseCase(repository);
    editLocation = new EditLocationUseCase(repository);

    location = await createLocation.execute({
      address: 'Some address',
      cityName: 'Bogotá',
      businessId: 'id',
    });
  });

  it('Should edit location', async () => {
    await editLocation.execute({
      locationId: location.id,
      address: 'Other address',
      cityName: 'Medellín',
    });

    const locationEdited = await repository.getOneLocation(
      new LocationId(location.id),
    );

    expect(locationEdited).toBeDefined();
    expect(locationEdited?.address.value).toBe('Other address');
    expect(locationEdited?.city.value).toBe('1');
  });

  it('Should edit location when cityName is not provided', async () => {
    await editLocation.execute({
      locationId: location.id,
      address: 'Other address',
    });

    const locationEdited = await repository.getOneLocation(
      new LocationId(location.id),
    );

    expect(locationEdited).toBeDefined();
    expect(locationEdited?.address.value).toBe('Other address');
    expect(locationEdited?.city.value).toBe('0');
  });

  it('Should edit location when address is not provided', async () => {
    await editLocation.execute({
      locationId: location.id,
      cityName: 'Medellín',
    });

    const locationEdited = await repository.getOneLocation(
      new LocationId(location.id),
    );

    expect(locationEdited).toBeDefined();
    expect(locationEdited?.city.value).toBe('1');
  });

  it('Should throw an error when the city not found', async () => {
    await expect(
      editLocation.execute({
        locationId: location.id,
        cityName: 'New york',
      }),
    ).rejects.toThrow(HttpError);
  });

  it('Should throw an error when location not found', async () => {
    await expect(
      editLocation.execute({
        locationId: 'xxxxx',
        cityName: 'Medellín',
      }),
    ).rejects.toThrow(HttpError);
  });
});
