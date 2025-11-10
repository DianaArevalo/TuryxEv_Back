import { express as ex } from '../../../Shared/Infraestructure/External';
import { ExpressUserController } from '../controllers/ExpressUserController';

const controller = new ExpressUserController();
const ExpressUserRouter = ex.Router();

ExpressUserRouter.post('/create-user', controller.create.bind(controller));
ExpressUserRouter.get(
  '/get-user-one-by-id',
  controller.getOneById.bind(controller),
);
ExpressUserRouter.get('/get-all-users', controller.getAll.bind(controller));
ExpressUserRouter.get(
  '/get-user-by-email',
  controller.getOneByEmail.bind(controller),
);
ExpressUserRouter.patch('/edit-user', controller.edit.bind(controller));
ExpressUserRouter.patch(
  '/soft-delete/:id',
  controller.softDelete.bind(controller),
);
ExpressUserRouter.get(
  '/get-all-by-status',
  controller.getAllByStatus.bind(controller),
);

export { ExpressUserRouter };
