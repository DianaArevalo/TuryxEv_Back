import {
  GetAllByHotelId,
  GetOneByReservationId,
  GetUserReservations,
} from '../../../application';
import {
  ForViewReservations,
  Reservation,
  ReservationRepository,
} from '../../../domain';

export class ViewReservationsAdapter implements ForViewReservations {
  constructor(private readonly repository: ReservationRepository) {}

  getAllByHotel(hotelId: string): Promise<Reservation[]> {
    const getAll = new GetAllByHotelId(this.repository);
    return getAll.handler({ hotelId });
  }

  getAllUserReservations(userId: string): Promise<Reservation[]> {
    const getAll = new GetUserReservations(this.repository);
    return getAll.handler({ userId });
  }

  getOneById(reservationId: string): Promise<Reservation> {
    const getOne = new GetOneByReservationId(this.repository);
    return getOne.handler({ reservationId });
  }
}
