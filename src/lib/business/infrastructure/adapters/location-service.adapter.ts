
import { City, CityId, LocationId, LocationNotFoundError } from '~/lib/location/domain';
import { LocationServicePort } from '../../domain/ports/driven/location.service.port';
import { BusinessLocationServicePort } from '../../domain/ports/driving/business-location-service-port';
import cities from '~/lib/location/infrastructure/seeds/cities.seed';
import { UpdatelocationDTO } from '../../../../lib/location/application/use-cases';

export class LocationServiceAdapter implements BusinessLocationServicePort //DRIVING
 {
  //DRIVEN
  constructor(private readonly locationService: LocationServicePort) {}

   async updateLocation(props: UpdatelocationDTO): Promise<void> {
    await this.locationService.updateLocation(props);
  }



}
