import {
  CityName,
  CityResponse,
  Location,
  LocationAddress,
  LocationBusinessId,
  LocationHotelId,
  LocationId,
  LocationNotFoundError,
  LocationRepositoryPort,
} from '../../../domain';

import { UseCase } from '~/lib/shared/application';
import { ValidationError } from '~/lib/shared/domain';

export interface CreateLocationDTO {
  cityName: string;
  address: string;
  hotelId?: string;
  businessId?: string;
}

export interface CreateLocationResponse {
  city: CityResponse;
  id: string;
  address: string;
  hotelId: string | undefined;
  businessId: string | undefined;
}

export class CreateLocationUseCase
  implements UseCase<CreateLocationDTO, CreateLocationResponse>
{
  constructor(private readonly repository: LocationRepositoryPort) {}

  async execute(props: CreateLocationDTO): Promise<CreateLocationResponse> {
    if ([props.hotelId, props.businessId].filter(Boolean).length !== 1)
      throw new ValidationError(
        'Exactly one of hotelId or businessId must be defined.',
      );

    const city = await this.repository.getOneCityByName(
      new CityName(props.cityName),
    );

    if (!city) throw new LocationNotFoundError('City not found');

    const newLocation = new Location({
      locationId: new LocationId(''),
      city: city.cityId,
      address: LocationAddress.create(props.address),
      hotelId: props.hotelId ? new LocationHotelId(props.hotelId) : undefined,
      businessId: props.businessId
        ? new LocationBusinessId(props.businessId)
        : undefined,
    });

    const createdLocation = (
      await this.repository.create(newLocation)
    ).toResponse();

    const cityResponse = city.toResponse();

    return {
      ...createdLocation,
      city: cityResponse,
    };
  }
}
