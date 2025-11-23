import { LocationRepositoryPort } from '~/lib/location/domain';
import { LocationRepositoryInMemoryAdapter } from '~/lib/location/infrastructure/adapters';
import { GetValidCitiesUseCase } from './get-valid-citites';

describe(' - Use Case', () => {
  let repository: LocationRepositoryPort;
  let getValidCities: GetValidCitiesUseCase;

  beforeEach(() => {
    repository = new LocationRepositoryInMemoryAdapter();
    getValidCities = new GetValidCitiesUseCase(repository);
  });

  it('should get valid cities', async () => {
    const cities = await getValidCities.execute();

    expect(cities).toHaveLength(5);
  });
});
