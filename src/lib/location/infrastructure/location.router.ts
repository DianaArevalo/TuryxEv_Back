import { controllers } from './location.composition';

import { express as ex } from '~/lib/Shared/Infraestructure/External';

const ExpressLocationRouter = ex.Router();

const {
  createCityController,
  getLocationByOwnerController,
  getValidCitiesController,
  editLocationController,
} = controllers;

ExpressLocationRouter.post(
  '/create-city',
  createCityController.handle.bind(createCityController),
);

ExpressLocationRouter.get(
  '/get-location-by-owner',
  getLocationByOwnerController.handle.bind(getLocationByOwnerController),
);

ExpressLocationRouter.get(
  '/get-valid-cities',
  getValidCitiesController.handle.bind(getValidCitiesController),
);

ExpressLocationRouter.patch(
  '/edit-location',
  editLocationController.handle.bind(editLocationController),
);

export { ExpressLocationRouter };
