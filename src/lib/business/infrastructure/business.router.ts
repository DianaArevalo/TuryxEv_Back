import { controllers } from './business.composition';

import { express as ex } from '~/lib/shared/Infraestructure/External';

const ExpressBusinessRouter = ex.Router();

const {
  createBusinessController,
  editBusinessController,
  getBusinessesController,
  getOneBusinessController,
  softDeleteController,
} = controllers;

ExpressBusinessRouter.post(
  '/create-business',
  createBusinessController.handle.bind(createBusinessController),
);

ExpressBusinessRouter.patch(
  '/edit-business',
  editBusinessController.handle.bind(editBusinessController),
);

ExpressBusinessRouter.get(
  '/get-businesses',
  getBusinessesController.handle.bind(getBusinessesController),
);

ExpressBusinessRouter.get(
  '/get-one-business',
  getOneBusinessController.handle.bind(getOneBusinessController),
);

ExpressBusinessRouter.patch(
  '/soft-delete',
  softDeleteController.handle.bind(softDeleteController),
);

export { ExpressBusinessRouter };
