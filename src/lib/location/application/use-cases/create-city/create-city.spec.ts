import { CreateCityUseCase } from './create-city';

import { LocationRepositoryPort } from '~/lib/location/domain';
import { LocationRepositoryInMemoryAdapter } from '~/lib/location/infrastructure/adapters';

describe('Create City - Use Case', () => {
  let repository: LocationRepositoryPort;
  let createCity: CreateCityUseCase;

  beforeEach(() => {
    repository = new LocationRepositoryInMemoryAdapter();
    createCity = new CreateCityUseCase(repository);
  });

  it('Should create new city', async () => {
    const citiesCount = (await repository.getValidCities()).length;

    const newCity = await createCity.execute({ name: 'New York' });

    expect(newCity.name).toEqual('New York');

    const newCityCount = (await repository.getValidCities()).length;

    expect(newCityCount).toEqual(citiesCount + 1);
  });

  it('Should return a city already exists', async () => {
    const citiesCount = (await repository.getValidCities()).length;

    const newCity = await createCity.execute({ name: 'Bogotá' });

    expect(newCity.name).toEqual('Bogotá');

    const newCityCount = (await repository.getValidCities()).length;

    expect(newCityCount).toEqual(citiesCount);
  });

  it('Should return a city already exists when cityName is in uppercase', async () => {
    const citiesCount = (await repository.getValidCities()).length;

    const newCity = await createCity.execute({ name: 'BOGOTÁ' });

    expect(newCity.name).toEqual('Bogotá');

    const newCityCount = (await repository.getValidCities()).length;

    expect(newCityCount).toEqual(citiesCount);
  });
});
