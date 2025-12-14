import { BusinessId, BusinessLocation } from "../../entities";

// business/domain/ports/location-service.port.ts
export interface BusinessLocationServicePort {

  updateLocation(
    location: BusinessLocation
  ): Promise<void>;
}
