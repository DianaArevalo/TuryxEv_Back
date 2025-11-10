import { ValidationError } from '../../../Shared/domain';
import {
  LocationBusinessId,
  LocationHotelId,
  LocationRepository,
} from '../../domain';

interface GetLocationByOwnerHandlerProps {
  ownerId: string;
  ownerType: string;
}

export class GetLocationByOwner {
  constructor(private readonly repository: LocationRepository) {}

  async handler(props: GetLocationByOwnerHandlerProps) {
    if (props.ownerType === 'HOTEL')
      return this.repository.getLocationByHotel(
        new LocationHotelId(props.ownerId),
      );
    else if (props.ownerType === 'BUSINESS')
      return this.repository.getLocationByBusiness(
        new LocationBusinessId(props.ownerId),
      );

    throw new ValidationError('Invalid owner type');
  }
}
