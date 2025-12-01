import { controllers } from './location.composition';

import { express as ex } from '~/lib/shared/infrastructure';

const ExpressLocationRouter = ex.Router();

const {
  getLocationByOwnerController,
  getValidCitiesController,
  editLocationController,
} = controllers;

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
