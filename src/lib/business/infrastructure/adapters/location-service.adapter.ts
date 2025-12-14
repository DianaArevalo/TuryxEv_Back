
import { BusinessLocation } from '../../domain';
import { LocationServicePort } from '../../domain/ports/driven/location.service.port';
import { BusinessLocationServicePort } from '../../domain/ports/driving/business-location-service-port';

export class LocationServiceAdapter implements BusinessLocationServicePort //DRIVING
 {
  //DRIVEN
  constructor(private readonly locationService: LocationServicePort) {}

  async updateLocation(
  location: BusinessLocation
): Promise<void> {
  await this.locationService.updateLocation({
    locationId: location.value.locationId!,
    address: location.value.address,
  });
} 
}
