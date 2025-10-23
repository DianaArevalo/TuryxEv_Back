import { Reservation } from "../../entities";

export interface ForViewReservations {
  getAllByHotel(hotelId: string): Promise<Reservation[]>;
  getAllUserReservations(userId: string): Promise<Reservation[]>;
  getOneById(reservationId: string): Promise<Reservation>;
}
