import { LocationServiceAdapter } from '../application';
import { LocationRepositoryInMemoryAdapter } from './adapters';
import { buildLocationControllers } from './controllers';

export const locationCompositionMock = () => {
  const locationRepository = new LocationRepositoryInMemoryAdapter();

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
