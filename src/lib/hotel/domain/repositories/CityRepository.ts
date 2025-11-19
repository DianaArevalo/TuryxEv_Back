import { HotelLocation } from '../entities';

export interface CityRepository {
  getValidCities(): Promise<HotelLocation[]>;
  isValidCity(city: HotelLocation): Promise<boolean>;
  // getHotelsByCity(): Promise<Hotel[]>
  createCity(city: string): HotelLocation;
}
