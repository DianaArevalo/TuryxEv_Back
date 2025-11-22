import { controllers } from './hotel.composition';

import { express as ex } from '~/lib/shared/infrastructure';

const ExpressHotelRouter = ex.Router();

const {
  blockHotelController,
  checkHotelFreePlansController,
  createHotelController,
  editHotelController,
  getHotelsController,
  getOneHotelController,
} = controllers;

ExpressHotelRouter.patch(
  '/block-hotel',
  blockHotelController.handle.bind(blockHotelController),
);

ExpressHotelRouter.patch(
  '/check-expired-plans',
  checkHotelFreePlansController.handle.bind(checkHotelFreePlansController),
);

ExpressHotelRouter.post(
  '/create',
  createHotelController.handle.bind(createHotelController),
);

ExpressHotelRouter.patch(
  '/edit',
  editHotelController.handle.bind(editHotelController),
);

ExpressHotelRouter.get(
  '/get-hotels',
  getHotelsController.handle.bind(getHotelsController),
);

ExpressHotelRouter.get(
  '/get-one-hotel',
  getOneHotelController.handle.bind(getOneHotelController),
);

export { ExpressHotelRouter };
