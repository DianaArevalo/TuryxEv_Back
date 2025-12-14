import { CityResponse, LocationResponse } from "../../domain";
import { LocationRepositoryPort, LocationServicePort } from "../../domain/ports";
import {
  GetLocationByOwnerDTO,
  GetLocationByOwnerUseCase,
  UpdatelocationDTO,
  GetValidCitiesUseCase,
  UpdateLocationUseCase,
} from "../use-cases";

export class LocationServiceAdapter implements LocationServicePort {
  constructor(
    private readonly getLocationByOwnerUseCase: GetLocationByOwnerUseCase,
    private readonly getValidCitiesUseCase: GetValidCitiesUseCase,
    private readonly updateLocationUseCase: UpdateLocationUseCase,
    
  ) {}

  getLocationByOwner(props: GetLocationByOwnerDTO): Promise<LocationResponse> {
    return this.getLocationByOwnerUseCase.execute(props);
  }

  getValidCities(): Promise<CityResponse[]> {
    return this.getValidCitiesUseCase.execute();
  }

  updateLocation(props: UpdatelocationDTO): Promise<void> {
    return this.updateLocationUseCase.execute(props);
  }
}
