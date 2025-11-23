import { CityResponse, LocationRepositoryPort } from '../../../domain';

import { UseCase } from '~/lib/shared/application';

export class GetValidCitiesUseCase implements UseCase<void, CityResponse[]> {
  constructor(private readonly repository: LocationRepositoryPort) {}

  async execute() {
    return (await this.repository.getValidCities()).map((city) =>
      city.toResponse(),
    );
  }
}
