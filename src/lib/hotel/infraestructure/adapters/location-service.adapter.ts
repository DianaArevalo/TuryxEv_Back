import { HotelId, HotelLocation, LocationServicePort } from '../../domain';

import { LocationServicePort as LocationService } from '~/lib/location/domain';
import { IdValueObject } from '~/lib/Shared/domain';

export class LocationServiceAdapter implements LocationServicePort {
  constructor(private readonly locationService: LocationService) {}

  async create(
    location: HotelLocation,
    hotelId: HotelId,
  ): Promise<HotelLocation> {
    const newLocation = await this.locationService.createLocation({
      cityName: location.value.cityName,
      address: location.value.address,
      hotelId: hotelId.value,
    });

    return new HotelLocation({
      locationId: newLocation.id,
      cityId: newLocation.city.id,
      cityName: newLocation.city.name,
      address: newLocation.address,
    });
  }

  async edit(location: HotelLocation): Promise<void> {
    return this.locationService.editLocation({
      locationId: location.value.locationId!,
      address: location.value.address,
      cityName: location.value.cityName,
    });
  }

  async getLocationById(id: IdValueObject): Promise<HotelLocation> {
    const location = await this.locationService.getPopulatedLocationById(
      id.value,
    );

    return new HotelLocation(location);
  }
}
