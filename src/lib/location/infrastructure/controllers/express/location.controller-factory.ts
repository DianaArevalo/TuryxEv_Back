<<<<<<< HEAD:src/lib/location/infrastructure/controllers/express/location-controller-factory.ts
import { GetLocationByOwnerController } from "./get-location-by-owner.controller";
import { GetValidCitiesController } from "./get-valid-cities.controller";
import { UpdateLocationController } from "./update-location.controller";
import { LocationRepositoryPort } from "../../../domain";

import {
  GetLocationByOwnerUseCase,
  GetValidCitiesUseCase,
  UpdateLocationUseCase,
} from "~/lib/location/application/use-cases";
=======
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
>>>>>>> f17658e (refactor(business): business hexagon refactorized):src/lib/location/infrastructure/controllers/express/location.controller-factory.ts

export const buildLocationControllers = (
  locationRepository: LocationRepositoryPort
) => {
<<<<<<< HEAD:src/lib/location/infrastructure/controllers/express/location-controller-factory.ts
=======
  const createCityUseCase = new CreateCityUseCase(locationRepository);
  const createCityController = new CreateCityController(createCityUseCase);

  const createLocationUseCase = new CreateLocationUseCase(locationRepository);

>>>>>>> f17658e (refactor(business): business hexagon refactorized):src/lib/location/infrastructure/controllers/express/location.controller-factory.ts
  const getLocationByOwnerUseCase = new GetLocationByOwnerUseCase(
    locationRepository
  );
  const getLocationByOwnerController = new GetLocationByOwnerController(
    getLocationByOwnerUseCase
  );

  const getValidCitiesUseCase = new GetValidCitiesUseCase(locationRepository);
  const getValidCitiesController = new GetValidCitiesController(
    getValidCitiesUseCase
  );

<<<<<<< HEAD:src/lib/location/infrastructure/controllers/express/location-controller-factory.ts
  const updateLocationUseCase = new UpdateLocationUseCase(locationRepository);
  const updateLocationController = new UpdateLocationController(
    updateLocationUseCase
=======
  const editLocationUseCase = new EditLocationUseCase(locationRepository);
  const editLocationController = new EditLocationController(
    editLocationUseCase,
>>>>>>> f17658e (refactor(business): business hexagon refactorized):src/lib/location/infrastructure/controllers/express/location.controller-factory.ts
  );

  return {
    controllers: {
      getLocationByOwnerController,
      getValidCitiesController,
      editLocationController,
    },
    useCases: {
<<<<<<< HEAD:src/lib/location/infrastructure/controllers/express/location-controller-factory.ts
=======
      createCityUseCase,
      createLocationUseCase,
>>>>>>> f17658e (refactor(business): business hexagon refactorized):src/lib/location/infrastructure/controllers/express/location.controller-factory.ts
      getLocationByOwnerUseCase,
      getValidCitiesUseCase,
      editLocationUseCase,
    },
  };
};
