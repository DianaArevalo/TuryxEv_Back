//entrada como el mundo puede usarme

import {
  GetLocationByOwnerDTO,
  UpdatelocationDTO,
} from "../../../application/use-cases";
import { CityResponse, LocationBusinessId, LocationResponse } from "../../entities";

export interface LocationServicePort {
  getLocationByOwner(props: GetLocationByOwnerDTO): Promise<LocationResponse>;
  getValidCities(): Promise<CityResponse[]>;
  updateLocation(props: UpdatelocationDTO): Promise<void>;
}
