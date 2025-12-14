import {
  GetLocationByOwnerDTO,
  UpdatelocationDTO,
} from "../../../application/use-cases";
import { CityResponse, LocationResponse } from "../../entities";

export interface LocationServicePort {
  getLocationByOwner(props: GetLocationByOwnerDTO): Promise<LocationResponse>;
  getValidCities(): Promise<CityResponse[]>;
  updateLocation(props: UpdatelocationDTO): Promise<void>;
}
