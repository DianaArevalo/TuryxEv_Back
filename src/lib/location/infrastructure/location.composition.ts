<<<<<<< HEAD
import { LocationRepositoryMongoAdapter } from "./adapters";
import { buildLocationControllers } from "./controllers";
import { LocationServiceAdapter } from "../application/adapters/location-service.adapter";
=======
import { LocationRepositoryMongoAdapter } from './adapters';
import { buildLocationControllers } from './controllers';
import { LocationServiceAdapter } from '../application';
>>>>>>> f17658e (refactor(business): business hexagon refactorized)

const locationComposition = () => {
  const locationRepository = new LocationRepositoryMongoAdapter();

  const {
    controllers,
<<<<<<< HEAD
    useCases: {
      createLocationUseCase,
      editLocationUseCase,
      getPopulatedLocationByIdUseCase,
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
=======
    useCases: { createLocationUseCase, editLocationUseCase },
  } = buildLocationControllers(locationRepository);

  const locationService = new LocationServiceAdapter({
    createLocationUseCase,
    editLocationUseCase,
    getPopulatedLocationByIdUseCase,
  });
>>>>>>> f17658e (refactor(business): business hexagon refactorized)

  return {
    controllers,
    locationService,
  };
};

export const { controllers, locationService } = locationComposition();
