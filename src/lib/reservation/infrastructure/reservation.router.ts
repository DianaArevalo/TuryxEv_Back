import { controllers } from './reservation.composition';

import { express as ex } from '~/lib/shared/Infraestructure/External';

const ExpressReservationRouter = ex.Router();

const {
  cancelReservationController,
  confirmReservationController,
  createReservationController,
  editReservationController,
  getReservationByIdController,
  getReservationsByHotelIdController,
  getUserReservationsController,
} = controllers;

ExpressReservationRouter.patch(
  '/cancel',
  cancelReservationController.handle.bind(cancelReservationController),
);

ExpressReservationRouter.patch(
  '/confirm',
  confirmReservationController.handle.bind(confirmReservationController),
);

ExpressReservationRouter.post(
  '/create',
  createReservationController.handle.bind(createReservationController),
);

ExpressReservationRouter.patch(
  '/edit',
  editReservationController.handle.bind(editReservationController),
);

ExpressReservationRouter.get(
  '/find-by-id',
  getReservationByIdController.handle.bind(getReservationByIdController),
);

ExpressReservationRouter.get(
  '/find-by-botel-id',
  getReservationsByHotelIdController.handle.bind(
    getReservationsByHotelIdController,
  ),
);

ExpressReservationRouter.get(
  '/find-user-reservations',
  getUserReservationsController.handle.bind(getUserReservationsController),
);

export { ExpressReservationRouter };
