import {
  Reservation,
  ReservationRepository,
} from '../../../../Reservation/domain';
import { ViewReservationsAdapter } from '../../../../Reservation/infrastructure/adapters/driven/view-reservations-adapter';
import { ForViewReservations } from '../../../domain';

export class ForViewReservationsAdapter implements ForViewReservations {
  viewReservations: ViewReservationsAdapter;

  constructor(private readonly reservationRepository: ReservationRepository) {
    this.viewReservations = new ViewReservationsAdapter(
      this.reservationRepository,
    );
  }

  getAllByHotel(hotelId: string): Promise<Reservation[]> {
    return this.viewReservations.getAllByHotel(hotelId);
  }

  getAllUserReservations(userId: string): Promise<Reservation[]> {
    return this.viewReservations.getAllUserReservations(userId);
  }

  getOneById(reservationId: string): Promise<Reservation> {
    return this.viewReservations.getOneById(reservationId);
  }
}
