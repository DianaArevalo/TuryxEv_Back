import {
  City,
  CityName,
  Location,
  LocationBusinessId,
  LocationHotelId,
  LocationId,
} from '../entities';

export interface LocationRepository {
  getValidCities(): Promise<City[]>;
  getLocationByHotel(hotel: LocationHotelId): Promise<Location>;
  getLocationByBusiness(business: LocationBusinessId): Promise<Location>;
  getOneLocation(locationId: LocationId): Promise<Location | null>;
  getOneCityByName(cityName: CityName): Promise<City | null>;
  isValidCity(cityName: CityName): Promise<boolean>;
  create(location: Location): Promise<Location>;
  createCity(cityName: CityName): Promise<City>;
  update(location: Location): Promise<Location>;
}
