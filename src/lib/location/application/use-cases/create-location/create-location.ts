import {
  CityName,
  CityResponse,
  Location,
  LocationAddress,
  LocationBusinessId,
  LocationHotelId,
  LocationId,
  LocationLatitude,
  LocationLongitude,
  LocationNotFoundError,
  LocationRepositoryPort,
} from '../../../domain';

import { UseCase } from '~/lib/shared/application';
import { ValidationError } from '~/lib/shared/domain';

export interface CreateLocationDTO {
  cityName: string;
  address: string;
  lat: number;
  lng: number;
  hotelId?: string;
  businessId?: string;
}

export interface CreateLocationResponse {
  city: CityResponse;
  id: string;
  address: string;
  locationLat: number;
  locationLng: number;
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
      locationLat: new LocationLatitude(props.lat),
      locationLng: new LocationLongitude(props.lng),
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
