import { ReservationServiceAdapter } from '../application';
import { ReservationRepositoryMongoDBAdapter } from './adapters';
import { buildReservationControllers } from './controllers/';

const reservationComposition = () => {
  const reservationRepository = new ReservationRepositoryMongoDBAdapter();

  const {
    controllers,
    useCases: {
      getReservationsByHotelIdUseCase,
      getReservationByIdUseCase,
      getUserReservationsUseCase,
    },
  } = buildReservationControllers(reservationRepository);

  const reservationService = new ReservationServiceAdapter({
    getReservationsByHotelId: getReservationsByHotelIdUseCase,
    getReservationById: getReservationByIdUseCase,
    getUserReservations: getUserReservationsUseCase,
  });

  return { controllers, reservationService };
};

export const { controllers, reservationService } = reservationComposition();
