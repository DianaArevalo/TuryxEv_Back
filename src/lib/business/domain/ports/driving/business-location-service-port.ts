import { UpdatelocationDTO } from "~/lib/location/application/use-cases";



// business/domain/ports/location-service.port.ts
export interface BusinessLocationServicePort {

updateLocation(
    props: UpdatelocationDTO
  ): Promise<void>;
}
