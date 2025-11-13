import { CreateCityController } from './create-city.controller';
import { GetLocationByOwnerController } from './get-location-by-owner.controller';
import { GetValidCitiesController } from './get-valid-cities.controller';
import { EditLocationController } from './edit-location.controller';
import { LocationRepositoryPort } from '../../../domain';

import {
  CreateCityUseCase,
  CreateLocationUseCase,
  GetLocationByOwnerUseCase,
  GetValidCitiesUseCase,
  EditLocationUseCase,
} from '~/lib/location/application/use-cases';

export const buildLocationControllers = (
  locationRepository: LocationRepositoryPort,
) => {
  const createCityUseCase = new CreateCityUseCase(locationRepository);
  const createCityController = new CreateCityController(createCityUseCase);

  const createLocationUseCase = new CreateLocationUseCase(locationRepository);

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
      createCityController,
      getLocationByOwnerController,
      getValidCitiesController,
      editLocationController,
    },
    useCases: {
      createCityUseCase,
      createLocationUseCase,
      getLocationByOwnerUseCase,
      getValidCitiesUseCase,
      editLocationUseCase,
    },
  };
};
