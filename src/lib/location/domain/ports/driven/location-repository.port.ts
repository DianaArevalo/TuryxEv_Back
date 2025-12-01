import {
  City,
  CityId,
  CityName,
  Location,
  LocationBusinessId,
  LocationHotelId,
  LocationId,
} from '../../entities';

export interface LocationRepositoryPort {
  getValidCities(): Promise<City[]>;
  getLocationByHotel(hotel: LocationHotelId): Promise<Location>;
  getLocationByBusiness(business: LocationBusinessId): Promise<Location>;
  getOneLocation(locationId: LocationId): Promise<Location | null>;
  getOneCity(cityId: CityId): Promise<City | null>;
  getOneCityByName(cityName: CityName): Promise<City | null>;
  isValidCity(cityName: CityName): Promise<boolean>;
  create(location: Location): Promise<Location>;
  update(location: Location): Promise<Location>;
}
