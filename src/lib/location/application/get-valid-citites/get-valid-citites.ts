import { LocationRepository } from "../../domain";

export class GetValidCities {
  constructor(private readonly repository: LocationRepository) {}

  async handler() {
    return await this.repository.getValidCities();
  }
}
