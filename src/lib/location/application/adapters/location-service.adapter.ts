<<<<<<< HEAD
import { CityResponse, LocationResponse } from "../../domain";
import { LocationServicePort } from "../../domain/ports";
import {
  GetLocationByOwnerDTO,
  GetLocationByOwnerUseCase,
  UpdatelocationDTO,
  GetValidCitiesUseCase,
  UpdateLocationUseCase,
} from "../use-cases";
=======
import { LocationServicePort } from '../../domain';
import {
  CreateLocationDTO,
  CreateLocationResponse,
  CreateLocationUseCase,
  EditLocationDTO,
  EditLocationUseCase,
} from '../use-cases';
>>>>>>> f17658e (refactor(business): business hexagon refactorized)

interface LocationAdapterProps {
  createLocationUseCase: CreateLocationUseCase;
  editLocationUseCase: EditLocationUseCase;
}

export class LocationServiceAdapter implements LocationServicePort {
<<<<<<< HEAD
  constructor(
    private readonly getLocationByOwnerUseCase: GetLocationByOwnerUseCase,
    private readonly getValidCitiesUseCase: GetValidCitiesUseCase,
    private readonly updateLocationUseCase: UpdateLocationUseCase
  ) {}

  getLocationByOwner(props: GetLocationByOwnerDTO): Promise<LocationResponse> {
    return this.getLocationByOwnerUseCase.execute(props);
  }

  getValidCities(): Promise<CityResponse[]> {
    return this.getValidCitiesUseCase.execute();
  }

  updateLocation(props: UpdatelocationDTO): Promise<void> {
    return this.updateLocationUseCase.execute(props);
=======
  constructor(private readonly params: LocationAdapterProps) {}

  createLocation(props: CreateLocationDTO): Promise<CreateLocationResponse> {
    return this.params.createLocationUseCase.execute(props);
  }

  editLocation(props: EditLocationDTO) {
    return this.params.editLocationUseCase.execute(props);
>>>>>>> f17658e (refactor(business): business hexagon refactorized)
  }
}
