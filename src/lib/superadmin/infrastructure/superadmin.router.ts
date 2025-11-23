import { controllers } from './superadmin.composition';

import { express as ex } from '~/lib/shared/infrastructure';

const ExpressSuperAdminRouter = ex.Router();

const {
  createSuperAdminController,
  superAdminEditBusinessController,
  superAdminEditHotelController,
  editSuperAdminController,
  superAdminGetOneReservationController,
  getOneSuperAdminController,
  superAdminGetReservationsController,
  getSuperAdminsController,
  softDeleteSuperAdminController,
} = controllers;

ExpressSuperAdminRouter.post(
  '/create',
  createSuperAdminController.handle.bind(createSuperAdminController),
);

ExpressSuperAdminRouter.patch(
  '/business/edit',
  superAdminEditBusinessController.handle.bind(
    superAdminEditBusinessController,
  ),
);

ExpressSuperAdminRouter.patch(
  '/hotel/edit',
  superAdminEditHotelController.handle.bind(superAdminEditHotelController),
);

ExpressSuperAdminRouter.patch(
  '/edit',
  editSuperAdminController.handle.bind(editSuperAdminController),
);

ExpressSuperAdminRouter.get(
  '/reservation/get-one-reservation',
  superAdminGetOneReservationController.handle.bind(
    superAdminGetOneReservationController,
  ),
);

ExpressSuperAdminRouter.get(
  '/get-one-superadmin',
  getOneSuperAdminController.handle.bind(getOneSuperAdminController),
);

ExpressSuperAdminRouter.get(
  '/reservation/get-reservations',
  superAdminGetReservationsController.handle.bind(
    superAdminGetReservationsController,
  ),
);

ExpressSuperAdminRouter.get(
  '/get-superadmins',
  getSuperAdminsController.handle.bind(getSuperAdminsController),
);

ExpressSuperAdminRouter.get(
  '/soft-delete',
  softDeleteSuperAdminController.handle.bind(softDeleteSuperAdminController),
);

export { ExpressSuperAdminRouter };
