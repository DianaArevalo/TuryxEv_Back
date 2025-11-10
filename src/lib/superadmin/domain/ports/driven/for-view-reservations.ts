import { Reservation } from '../../../../Reservation/domain';

export interface ForViewReservations {
  getAllByHotel(hotelId: string): Promise<Reservation[]>;
  getAllUserReservations(userId: string): Promise<Reservation[]>;
  getOneById(reservationId: string): Promise<Reservation>;
}
