import { CreateCityController } from './create-city.controller';
import { GetLocationByOwnerController } from './get-location-by-owner.controller';
import { GetValidCitiesController } from './get-valid-cities.controller';
import { UpdateLocationController } from './update-location.controller';
import { LocationRepositoryPort } from '../../../domain';

import {
  CreateCityUseCase,
  GetLocationByOwnerUseCase,
  GetValidCitiesUseCase,
  UpdateLocationUseCase,
} from '~/lib/location/application/use-cases';

export const buildLocationControllers = (
  locationRepository: LocationRepositoryPort,
) => {
  const createCityUseCase = new CreateCityUseCase(locationRepository);
  const createCityController = new CreateCityController(createCityUseCase);

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

  const updateLocationUseCase = new UpdateLocationUseCase(locationRepository);
  const updateLocationController = new UpdateLocationController(
    updateLocationUseCase,
  );

  return {
    controllers: {
      createCityController,
      getLocationByOwnerController,
      getValidCitiesController,
      updateLocationController,
    },
    useCases: {
      createCityUseCase,
      getLocationByOwnerUseCase,
      getValidCitiesUseCase,
      updateLocationUseCase,
    },
  };
};
