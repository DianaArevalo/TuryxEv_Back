
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

// async resolveLocation(props: {
//   cityName: string;
//   address: string;
//   ownerId: string;
//   ownerType: "BUSINESS" | "HOTEL";
// }): Promise<LocationId> {

//   // 1️⃣ Validar ciudad (regla de negocio)
//   const cities = await this.locationService.getValidCities();

//   const cityExists = cities.some(
//     c => c.name.toLowerCase() === props.cityName.toLowerCase()
//   );

//   if (!cityExists) {
//     throw new LocationNotFoundError();
//   }

//   // 2️⃣ Obtener Location EXISTENTE por owner
//   const location = await this.locationService.getLocationByOwner({
//     ownerId: props.ownerId,
//     ownerType: props.ownerType,
//   });

//   // 3️⃣ Actualizar address
//   await this.locationService.updateLocation({
//     locationId: location.id,
//     address: props.address,
//   });

//   return new LocationId(location.id);
// }


}
