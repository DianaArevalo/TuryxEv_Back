import {
  CityName,
  CityResponse,
  LocationRepositoryPort,
} from '../../../domain';

import { UseCase } from '~/lib/shared/application';

export interface CreateCityDTO {
  name: string;
}

export class CreateCityUseCase implements UseCase<CreateCityDTO, CityResponse> {
  constructor(private readonly repository: LocationRepositoryPort) {}

  async execute(props: CreateCityDTO) {
    return (
      await this.repository.createCity(CityName.create(props.name))
    ).toResponse();
  }
}
