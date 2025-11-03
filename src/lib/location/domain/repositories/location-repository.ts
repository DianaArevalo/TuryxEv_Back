import { Location, LocationBusinessId, LocationHotelId } from "../entities";

export interface LocationRepository {
  getValidLocations(): Promise<Location[]>;
  isValidLocation(location: Location): Promise<boolean>;
  getLocationByHotel(hotel: LocationHotelId): Promise<Location>;
  getLocationByBusiness(business: LocationBusinessId): Promise<Location>;
  create(location: Location): Promise<Location>;
  update(location: Location): Promise<Location>;
}
