import {
  CreateCityDTO,
  GetLocationByOwnerDTO,
  UpdatelocationDTO,
} from '../../../application/use-cases';
import { CityResponse, LocationResponse } from '../../entities';

export interface LocationServicePort {
  createCity(props: CreateCityDTO): Promise<CityResponse>;
  getLocationByOwner(props: GetLocationByOwnerDTO): Promise<LocationResponse>;
  getValidCities(): Promise<CityResponse[]>;
  updateLocation(props: UpdatelocationDTO): Promise<void>;
}
