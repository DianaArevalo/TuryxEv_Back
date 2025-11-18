import { express as ex } from '../../../Shared/Infraestructure/External';
import { ExpressReservationController } from '../controllers/express';

const controller = new ExpressReservationController();
const ExpressReservationRouter = ex.Router();

ExpressReservationRouter.get(
  '/get-one-by-id/:reservationId',
  controller.getOneByReservationId.bind(controller),
);
ExpressReservationRouter.get(
  '/get-all-user-reservations/:id',
  controller.getAllUserReservations.bind(controller),
);
ExpressReservationRouter.get(
  '/get-all-by-hotel-id/:id',
  controller.getAllByHotelId.bind(controller),
);
ExpressReservationRouter.post('/create', controller.create.bind(controller));
ExpressReservationRouter.patch('/edit', controller.edit.bind(controller));
ExpressReservationRouter.patch('/confirm', controller.confirm.bind(controller));
ExpressReservationRouter.patch('/cancel', controller.cancel.bind(controller));

export { ExpressReservationRouter };
