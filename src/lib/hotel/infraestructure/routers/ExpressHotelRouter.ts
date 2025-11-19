import { express as ex } from '../../../Shared/Infraestructure/External';
import { ExpressHotelController } from '../controller/express';

const controller = new ExpressHotelController();
const ExpressHotelRouter = ex.Router();

ExpressHotelRouter.get('/get-all', controller.getAll.bind(controller));
ExpressHotelRouter.get(
  '/get-one-by-email',
  controller.getOneByEmail.bind(controller),
);
ExpressHotelRouter.get(
  '/get-one-by-id',
  controller.getOneById.bind(controller),
);
ExpressHotelRouter.post('/create', controller.create.bind(controller));
ExpressHotelRouter.patch('/edit', controller.edit.bind(controller));
ExpressHotelRouter.patch(
  '/delete-updated',
  controller.updateStatus.bind(controller),
);

ExpressHotelRouter.get(
  '/get-by-plan',
  controller.getAllByPlan.bind(controller),
);
ExpressHotelRouter.get(
  '/get-by-role',
  controller.getAllByRole.bind(controller),
);
ExpressHotelRouter.get(
  '/get-by-status',
  controller.getAllByStatus.bind(controller),
);
ExpressHotelRouter.get(
  '/get-by-provider',
  controller.getAllByProvider.bind(controller),
);
ExpressHotelRouter.patch(
  '/find-expired-plans',
  controller.checkHotelFreePlans.bind(controller),
);

export { ExpressHotelRouter };
