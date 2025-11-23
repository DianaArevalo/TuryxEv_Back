import { CancelReservationController } from './cancel-reservation.controller';
import { ConfirmReservationController } from './confirm-reservation.controller';
import { CreateReservationController } from './create-reservation.controller';
import { EditReservationController } from './edit-reservation.controller';
import { GetReservationByIdController } from './get-reservation-by-id.controller';
import { GetReservationsByHotelIdController } from './get-reservations-by-hotel-id.controller';
import { GetUserReservationsController } from './get-user-reservations.controller';

import {
  CancelReservationUseCase,
  ConfirmReservationUseCase,
  CreateReservationUseCase,
  EditReservationUseCase,
  GetReservationByIdUseCase,
  GetReservationsByHotelIdUseCase,
  GetUserReservationsUseCase,
} from '~/lib/reservation/application';
import { ReservationRepositoryPort } from '~/lib/reservation/domain';

export const buildReservationControllers = (
  reservationRepository: ReservationRepositoryPort,
) => {
  const cancelReservationUseCase = new CancelReservationUseCase(
    reservationRepository,
  );
  const cancelReservationController = new CancelReservationController(
    cancelReservationUseCase,
  );

  const confirmReservationUseCase = new ConfirmReservationUseCase(
    reservationRepository,
  );
  const confirmReservationController = new ConfirmReservationController(
    confirmReservationUseCase,
  );

  const createReservationUseCase = new CreateReservationUseCase(
    reservationRepository,
  );
  const createReservationController = new CreateReservationController(
    createReservationUseCase,
  );

  const editReservationUseCase = new EditReservationUseCase(
    reservationRepository,
  );
  const editReservationController = new EditReservationController(
    editReservationUseCase,
  );

  const getReservationByIdUseCase = new GetReservationByIdUseCase(
    reservationRepository,
  );
  const getReservationByIdController = new GetReservationByIdController(
    getReservationByIdUseCase,
  );

  const getReservationsByHotelIdUseCase = new GetReservationsByHotelIdUseCase(
    reservationRepository,
  );
  const getReservationsByHotelIdController =
    new GetReservationsByHotelIdController(getReservationsByHotelIdUseCase);

  const getUserReservationsUseCase = new GetUserReservationsUseCase(
    reservationRepository,
  );
  const getUserReservationsController = new GetUserReservationsController(
    getUserReservationsUseCase,
  );

  return {
    controllers: {
      cancelReservationController,
      confirmReservationController,
      createReservationController,
      editReservationController,
      getReservationByIdController,
      getReservationsByHotelIdController,
      getUserReservationsController,
    },
    useCases: {
      cancelReservationUseCase,
      confirmReservationUseCase,
      createReservationUseCase,
      editReservationUseCase,
      getReservationByIdUseCase,
      getReservationsByHotelIdUseCase,
      getUserReservationsUseCase,
    },
  };
};
