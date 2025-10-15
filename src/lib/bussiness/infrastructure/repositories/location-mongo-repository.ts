import { Business, BusinessLocation, LocationRepository } from "../../domain";

export class MongoLocationRepository implements LocationRepository {
  getValidLocations(): Promise<BusinessLocation[]> {
    throw new Error("Method not implemented.");
  }
  isValidLocation(location: BusinessLocation): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getBusinessByLocation(): Promise<Business[]> {
    throw new Error("Method not implemented.");
  }
}
