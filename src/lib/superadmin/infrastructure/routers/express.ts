import { express as ex } from '../../../Shared/Infraestructure/External';
import { ExpressSuperAdminController } from '../controllers/express';

const controller = new ExpressSuperAdminController();
const ExpressSuperAdminRouter = ex.Router();

ExpressSuperAdminRouter.post('/create', controller.create.bind(controller));
ExpressSuperAdminRouter.patch('/edit', controller.edit.bind(controller));
ExpressSuperAdminRouter.get('/get-all', controller.getAll.bind(controller));
ExpressSuperAdminRouter.get(
  '/get-all-by-isactive',
  controller.getAllByIsActive.bind(controller),
);
ExpressSuperAdminRouter.get(
  '/get-one-by-email',
  controller.getOneByEmail.bind(controller),
);
ExpressSuperAdminRouter.get(
  '/get-one-by-id',
  controller.getOneById.bind(controller),
);
ExpressSuperAdminRouter.get(
  '/business/edit',
  controller.editBusiness.bind(controller),
);
ExpressSuperAdminRouter.get(
  '/reservations/get-all-by-hotel-id',
  controller.getAllReservationsByHotelId.bind(controller),
);
ExpressSuperAdminRouter.get(
  '/reservations/get-all-user-reservations',
  controller.getAllUserReservations.bind(controller),
);
ExpressSuperAdminRouter.get(
  '/reservations/get-one-reservation',
  controller.getOneReservation.bind(controller),
);
ExpressSuperAdminRouter.patch(
  '/delete',
  controller.softDelete.bind(controller),
);

export { ExpressSuperAdminRouter };
