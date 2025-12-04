import {
  CityName,
  LocationAddress,
  LocationId,
  LocationNotFoundError,
  LocationRepositoryPort,
} from '../../../domain';

import { UseCase } from '~/lib/Shared/application/usecase';

export interface UpdatelocationDTO {
  locationId: string;
  cityName?: string;
  address?: string;
}

export class UpdateLocationUseCase implements UseCase<UpdatelocationDTO, void> {
  constructor(private readonly repository: LocationRepositoryPort) {}

  async execute(props: UpdatelocationDTO) {
    const result = await this.repository.getOneLocation(
      new LocationId(props.locationId),
    );

    if (!result) throw new LocationNotFoundError();

    if (props.cityName) {
      const isValidCity = await this.repository.isValidCity(
        new CityName(props.cityName),
      );

      if (!isValidCity) throw new LocationNotFoundError();

      const city = await this.repository.getOneCityByName(
        new CityName(props.cityName),
      );

      if (!city) throw new LocationNotFoundError();

      result.city = city.cityId;
    }

    if (props.address) {
      result.address = LocationAddress.create(props.address);
    }

    await this.repository.update(result);
  }
}
