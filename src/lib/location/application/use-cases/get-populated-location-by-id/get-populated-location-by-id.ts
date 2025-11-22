import {
  LocationId,
  LocationNotFoundError,
  LocationRepositoryPort,
} from '~/lib/location/domain';
import { UseCase } from '~/lib/shared/application';
import { LocationValueObjectI } from '~/lib/shared/domain';

export interface GetPopulatedLocationByIdDTO {
  id: string;
}

export class GetPopulatedLocationByIdUseCase
  implements UseCase<GetPopulatedLocationByIdDTO, LocationValueObjectI>
{
  constructor(private readonly repository: LocationRepositoryPort) {}

  async execute(
    props: GetPopulatedLocationByIdDTO,
  ): Promise<LocationValueObjectI> {
    const location = await this.repository.getOneLocation(
      new LocationId(props.id),
    );

    if (!location) throw new LocationNotFoundError();

    const city = await this.repository.getOneCity(location.city);

    return {
      locationId: location.locationId.value,
      address: location.address.value,
      cityId: location.city.value,
      cityName: city!.name.value,
    };
  }
}
