import { LocationRepositoryMongoAdapter } from './adapters';
import { buildLocationControllers } from './controllers';
import { LocationServiceAdapter } from '../application';

const locationComposition = () => {
  const locationRepository = new LocationRepositoryMongoAdapter();

  const {
    controllers,
    useCases: {
      createLocationUseCase,
      editLocationUseCase,
      getPopulatedLocationByIdUseCase,
    },
  } = buildLocationControllers(locationRepository);

  const locationService = new LocationServiceAdapter({
    createLocationUseCase,
    editLocationUseCase,
    getPopulatedLocationByIdUseCase,
  });

  return {
    controllers,
    locationService,
  };
};

export const { controllers, locationService } = locationComposition();
