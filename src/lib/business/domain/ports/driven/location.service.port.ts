import { GetLocationByOwnerDTO, UpdatelocationDTO } from "../../../../../lib/location/application/use-cases";
import { CityResponse, LocationResponse } from "~/lib/location/domain";


export interface LocationServicePort {
  getLocationByOwner(
    props: GetLocationByOwnerDTO
  ): Promise<LocationResponse>;

  getValidCities(): Promise<CityResponse[]>;

  updateLocation(
    props: UpdatelocationDTO
  ): Promise<void>;
}
