import { express as ex } from '../../../Shared/Infraestructure/External';
import { ExpressBusinessController } from '../controllers/express';

const controller = new ExpressBusinessController();
const ExpressBusinessRouter = ex.Router();

ExpressBusinessRouter.post('/create', controller.create.bind(controller));
ExpressBusinessRouter.patch('/edit', controller.edit.bind(controller));
ExpressBusinessRouter.get('/get-all', controller.getAll.bind(controller));
ExpressBusinessRouter.get(
  '/get-all-by-plan',
  controller.getAllByPlan.bind(controller),
);
ExpressBusinessRouter.get(
  '/get-all-by-role',
  controller.getAllByRole.bind(controller),
);
ExpressBusinessRouter.get(
  '/get-all-by-status',
  controller.getAllByStatus.bind(controller),
);
ExpressBusinessRouter.get(
  '/get-all-by-provider',
  controller.getAllByProviderData.bind(controller),
);
ExpressBusinessRouter.get(
  '/get-one-by-email',
  controller.getOneByEmail.bind(controller),
);
ExpressBusinessRouter.get(
  '/get-one-by-id',
  controller.getOneById.bind(controller),
);
ExpressBusinessRouter.patch('/delete', controller.softDelete.bind(controller));

export { ExpressBusinessRouter };
