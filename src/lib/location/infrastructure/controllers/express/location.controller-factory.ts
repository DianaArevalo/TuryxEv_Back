import { EditLocationController } from './edit-location.controller';
import { GetLocationByOwnerController } from './get-location-by-owner.controller';
import { GetValidCitiesController } from './get-valid-cities.controller';
import { LocationRepositoryPort } from '../../../domain';

import { GetPopulatedLocationByIdUseCase } from '~/lib/location/application';
import {
  CreateLocationUseCase,
  GetLocationByOwnerUseCase,
  GetValidCitiesUseCase,
  EditLocationUseCase,
} from '~/lib/location/application/use-cases';

export const buildLocationControllers = (
  locationRepository: LocationRepositoryPort,
) => {
  const createLocationUseCase = new CreateLocationUseCase(locationRepository);
  const getPopulatedLocationByIdUseCase = new GetPopulatedLocationByIdUseCase(
    locationRepository,
  );

  const getLocationByOwnerUseCase = new GetLocationByOwnerUseCase(
    locationRepository,
  );
  const getLocationByOwnerController = new GetLocationByOwnerController(
    getLocationByOwnerUseCase,
  );

  const getValidCitiesUseCase = new GetValidCitiesUseCase(locationRepository);
  const getValidCitiesController = new GetValidCitiesController(
    getValidCitiesUseCase,
  );

  const editLocationUseCase = new EditLocationUseCase(locationRepository);
  const editLocationController = new EditLocationController(
    editLocationUseCase,
  );

  return {
    controllers: {
      getLocationByOwnerController,
      getValidCitiesController,
      editLocationController,
    },
    useCases: {
      createLocationUseCase,
      getLocationByOwnerUseCase,
      getValidCitiesUseCase,
      editLocationUseCase,
      getPopulatedLocationByIdUseCase,
    },
  };
};
