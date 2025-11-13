import {
<<<<<<< HEAD
  GetLocationByOwnerDTO,
  UpdatelocationDTO,
} from "../../../application/use-cases";
import { CityResponse, LocationResponse } from "../../entities";

export interface LocationServicePort {
  getLocationByOwner(props: GetLocationByOwnerDTO): Promise<LocationResponse>;
  getValidCities(): Promise<CityResponse[]>;
  updateLocation(props: UpdatelocationDTO): Promise<void>;
=======
  CreateLocationDTO,
  CreateLocationResponse,
  EditLocationDTO,
} from '../../../application/use-cases';

export interface LocationServicePort {
  createLocation(props: CreateLocationDTO): Promise<CreateLocationResponse>;
  editLocation(props: EditLocationDTO): Promise<void>;
>>>>>>> f17658e (refactor(business): business hexagon refactorized)
}
