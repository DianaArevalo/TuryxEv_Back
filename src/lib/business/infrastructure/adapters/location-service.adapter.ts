import {
  BusinessId,
  BusinessLocation,
  LocationServicePort,
} from '../../domain';

import { LocationServicePort as LocationService } from '~/lib/location/domain';
import { IdValueObject } from '~/lib/shared/domain';

export class LocationServiceAdapter implements LocationServicePort {
  constructor(private readonly locationService: LocationService) {}

  async create(
    location: BusinessLocation,
    businessId: BusinessId,
  ): Promise<BusinessLocation> {
    const newLocation = await this.locationService.createLocation({
      cityName: location.value.cityName,
      address: location.value.address,
      businessId: businessId.value,
      lat: location.value.lat,
      lng: location.value.lng,
    });

    return new BusinessLocation({
      locationId: newLocation.id,
      cityId: newLocation.city.id,
      cityName: newLocation.city.name,
      address: newLocation.address,
      lat: newLocation.locationLat,
      lng: newLocation.locationLng,
    });
  }

  edit(location: BusinessLocation): Promise<void> {
    return this.locationService.editLocation({
      locationId: location.value.locationId!,
      address: location.value.address,
      cityName: location.value.cityName,
    });
  }

  async getLocationById(id: IdValueObject): Promise<BusinessLocation> {
    const location = await this.locationService.getPopulatedLocationById(
      id.value,
    );

    return new BusinessLocation(location);
  }
}
