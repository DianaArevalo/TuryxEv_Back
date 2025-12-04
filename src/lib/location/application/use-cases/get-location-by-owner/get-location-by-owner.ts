import { ValidationError } from '../../../../Shared/domain';
import {
  Location,
  LocationBusinessId,
  LocationHotelId,
  LocationRepositoryPort,
  LocationResponse,
} from '../../../domain';

import { UseCase } from '~/lib/Shared/application/usecase';

export interface GetLocationByOwnerDTO {
  ownerId: string;
  ownerType: string;
}

export class GetLocationByOwnerUseCase
  implements UseCase<GetLocationByOwnerDTO, LocationResponse>
{
  constructor(private readonly repository: LocationRepositoryPort) {}

  async execute(props: GetLocationByOwnerDTO) {
    if (props.ownerType === 'HOTEL')
      return (
        await this.repository.getLocationByHotel(
          new LocationHotelId(props.ownerId),
        )
      ).toResponse();
    else if (props.ownerType === 'BUSINESS')
      return (
        await this.repository.getLocationByBusiness(
          new LocationBusinessId(props.ownerId),
        )
      ).toResponse();

    throw new ValidationError('Invalid owner type');
  }
}
