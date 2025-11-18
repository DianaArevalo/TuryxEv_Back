import {
  BusinessId,
  BusinessLocation,
  LocationServicePort,
} from '../../domain';

import { LocationServicePort as LocationService } from '~/lib/location/domain';
import { IdValueObject } from '~/lib/Shared/domain';

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
    });

    return new BusinessLocation({
      locationId: newLocation.id,
      cityId: newLocation.city.id,
      cityName: newLocation.city.name,
      address: newLocation.address,
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
