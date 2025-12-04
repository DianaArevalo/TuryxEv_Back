import { LocationRepositoryMongoAdapter } from "./adapters";
import { buildLocationControllers } from "./controllers";
import { LocationServiceAdapter } from "../application/adapters/location-service.adapter";

const locationComposition = () => {
  const locationRepository = new LocationRepositoryMongoAdapter();

  const {
    controllers,
    useCases: {
      getLocationByOwnerUseCase,
      getValidCitiesUseCase,
      updateLocationUseCase,
    },
  } = buildLocationControllers(locationRepository);

  // Esto será usado por los demás hexágonos
  const locationService = new LocationServiceAdapter(
    getLocationByOwnerUseCase,
    getValidCitiesUseCase,
    updateLocationUseCase
  );

  return {
    controllers,
    locationService,
  };
};

export const { controllers, locationService } = locationComposition();
