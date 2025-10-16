import { Business, BusinessLocation, LocationRepository } from "../../domain";

export class InMemoryLocationRepository implements LocationRepository {
  // fake data
  private locations: BusinessLocation[] = [
    new BusinessLocation("Bogotá"),
    new BusinessLocation("Medellín"),
    new BusinessLocation("Cali"),
    new BusinessLocation("Barranquilla"),
    new BusinessLocation("Cartagena"),
  ];

  async getValidLocations(): Promise<BusinessLocation[]> {
    return this.locations;
  }

  async isValidLocation(location: BusinessLocation): Promise<boolean> {
    return this.locations.some(
      (storedLocation) => storedLocation.value === location.value
    );
  }

  getBusinessByLocation(): Promise<Business[]> {
    throw new Error("Method not implemented.");
  }
}
