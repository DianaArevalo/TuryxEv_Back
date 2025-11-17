import {
  CityName,
  LocationAddress,
  LocationId,
  LocationNotFoundError,
  LocationRepositoryPort,
} from '../../../domain';

import { UseCase } from '~/lib/Shared/application/usecase';

export interface EditLocationDTO {
  locationId: string;
  cityName?: string;
  address?: string;
}

export class EditLocationUseCase implements UseCase<EditLocationDTO, void> {
  constructor(private readonly repository: LocationRepositoryPort) {}

  async execute(props: EditLocationDTO): Promise<void> {
    const result = await this.repository.getOneLocation(
      new LocationId(props.locationId),
    );

    if (!result) throw new LocationNotFoundError();

    if (props.cityName) {
      const city = await this.repository.getOneCityByName(
        new CityName(props.cityName),
      );

      if (!city) throw new LocationNotFoundError();

      result.city = city.cityId;
    }

    if (props.address) result.address = LocationAddress.create(props.address);

    await this.repository.update(result);
  }
}
