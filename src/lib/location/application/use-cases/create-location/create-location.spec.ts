import { CreateLocationUseCase } from './create-location';

import { LocationRepositoryPort } from '~/lib/location/domain';
import { LocationRepositoryInMemoryAdapter } from '~/lib/location/infrastructure/adapters';
import { HttpError } from '~/lib/Shared/domain';

describe('Create Location - Use Case', () => {
  let repository: LocationRepositoryPort;
  let createLocation: CreateLocationUseCase;

  beforeEach(() => {
    repository = new LocationRepositoryInMemoryAdapter();
    createLocation = new CreateLocationUseCase(repository);
  });

  it('Should create new location', async () => {
    const newLocation = await createLocation.execute({
      address: 'Some address',
      cityName: 'Bogotá',
      businessId: 'id',
    });

    expect(newLocation.address).toEqual('Some address');
    expect(newLocation.city.name).toEqual('Bogotá');
    expect(newLocation.businessId).toEqual('id');
    expect(newLocation.hotelId).not.toBeTruthy();
  });

  it('Should throw an error when cityName not found', async () => {
    await expect(
      createLocation.execute({
        address: 'Some address',
        cityName: 'New York',
        businessId: 'id',
      }),
    ).rejects.toThrow(HttpError);
  });

  it('Should throw an error when businessId or hotelId are duplicated', async () => {
    await createLocation.execute({
      address: 'Some address',
      cityName: 'Bogotá',
      businessId: 'id',
    });

    await expect(
      createLocation.execute({
        address: 'Some address',
        cityName: 'Bogotá',
        businessId: 'id',
      }),
    ).rejects.toThrow(HttpError);
  });

  it('Should throw an error when businessId and hotelId are not provided', async () => {
    await expect(
      createLocation.execute({
        address: 'Some address',
        cityName: 'Bogotá',
      }),
    ).rejects.toThrow(HttpError);
  });

  it('Should throw an error when businessId and hotelId are provided', async () => {
    await expect(
      createLocation.execute({
        address: 'Some address',
        cityName: 'Bogotá',
        businessId: 'id',
        hotelId: 'id',
      }),
    ).rejects.toThrow(HttpError);
  });
});
