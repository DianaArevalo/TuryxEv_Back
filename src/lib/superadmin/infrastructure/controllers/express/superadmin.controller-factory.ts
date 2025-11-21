import { CreateSuperAdminController } from './create-superadmin.controller';
import { SuperAdminEditBusinessController } from './edit-business.controller';
import { SuperAdminEditHotelController } from './edit-hotel.controller';
import { EditSuperAdminController } from './edit-superadmin.controller';
import { SuperAdminGetOneReservationController } from './get-one-reservation.controller';
import { GetOneSuperAdminController } from './get-one-superadmin.controller';
import { SuperAdminGetReservationsController } from './get-reservations.controller';
import { GetSuperAdminsController } from './get-superadmins.controller';
import { SoftDeleteSuperAdminController } from './soft-delete.controller';

import {
  CreateSuperAdminUseCase,
  EditSuperAdminUseCase,
  GetOneSuperAdminUseCase,
  GetSuperAdminsUseCase,
  SoftDeleteSuperAdminUseCase,
} from '~/lib/superadmin/application';
import {
  SuperAdminBusinessServicePort,
  SuperAdminHotelServicePort,
  SuperAdminRepositoryPort,
  SuperAdminReservationServicePort,
} from '~/lib/superadmin/domain';

export const buildSuperAdminControllers = (
  superAdminRepository: SuperAdminRepositoryPort,
  businessService: SuperAdminBusinessServicePort,
  hotelService: SuperAdminHotelServicePort,
  reservationService: SuperAdminReservationServicePort,
) => {
  const createSuperAdminUseCase = new CreateSuperAdminUseCase(
    superAdminRepository,
  );
  const createSuperAdminController = new CreateSuperAdminController(
    createSuperAdminUseCase,
  );

  const superAdminEditBusinessController = new SuperAdminEditBusinessController(
    businessService,
  );

  const superAdminEditHotelController = new SuperAdminEditHotelController(
    hotelService,
  );

  const editSuperAdminUseCase = new EditSuperAdminUseCase(superAdminRepository);
  const editSuperAdminController = new EditSuperAdminController(
    editSuperAdminUseCase,
  );

  const superAdminGetOneReservationController =
    new SuperAdminGetOneReservationController(reservationService);

  const getOneSuperAdminUseCase = new GetOneSuperAdminUseCase(
    superAdminRepository,
  );
  const getOneSuperAdminController = new GetOneSuperAdminController(
    getOneSuperAdminUseCase,
  );

  const superAdminGetReservationsController =
    new SuperAdminGetReservationsController(reservationService);

  const getSuperAdminsUseCase = new GetSuperAdminsUseCase(superAdminRepository);
  const getSuperAdminsController = new GetSuperAdminsController(
    getSuperAdminsUseCase,
  );

  const softDeleteSuperAdminUseCase = new SoftDeleteSuperAdminUseCase(
    superAdminRepository,
  );
  const softDeleteSuperAdminController = new SoftDeleteSuperAdminController(
    softDeleteSuperAdminUseCase,
  );

  return {
    controllers: {
      createSuperAdminController,
      superAdminEditBusinessController,
      superAdminEditHotelController,
      editSuperAdminController,
      superAdminGetOneReservationController,
      getOneSuperAdminController,
      superAdminGetReservationsController,
      getSuperAdminsController,
      softDeleteSuperAdminController,
    },
    useCases: {
      createSuperAdminUseCase,
      editSuperAdminUseCase,
      getOneSuperAdminUseCase,
      getSuperAdminsUseCase,
      softDeleteSuperAdminUseCase,
    },
  };
};
