import { controllers } from './user.composition';

import { express as ex } from '~/lib/shared/infrastructure';

const ExpressUserRouter = ex.Router();

const {
  createUserController,
  editUserController,
  getOneUserController,
  getUsersController,
  softDeleteUserController,
} = controllers;

ExpressUserRouter.post(
  '/create',
  createUserController.handle.bind(createUserController),
);

ExpressUserRouter.patch(
  '/edit',
  editUserController.handle.bind(editUserController),
);

ExpressUserRouter.get(
  '/get-one-user',
  getOneUserController.handle.bind(getOneUserController),
);

ExpressUserRouter.get(
  '/get-users',
  getUsersController.handle.bind(getUsersController),
);

ExpressUserRouter.delete(
  '/soft-delete',
  softDeleteUserController.handle.bind(softDeleteUserController),
);

export { ExpressUserRouter };
