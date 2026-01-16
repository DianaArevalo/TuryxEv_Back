import { Business, BusinessLocation } from "../entities";

export interface LocationRepository {
  getValidLocations(): Promise<BusinessLocation[]>;
  isValidLocation(location: BusinessLocation): Promise<boolean>;
  getBusinessByLocation(): Promise<Business[]>;
}
