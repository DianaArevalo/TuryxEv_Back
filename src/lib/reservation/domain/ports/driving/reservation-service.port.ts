import { ReservationResponse } from '../../entities';

export interface ReservationServicePort {
  getReservationsByHotelId(hotelId: string): Promise<ReservationResponse[]>;
  getUserReservations(userId: string): Promise<ReservationResponse[]>;
  getReservationById(reservationId: string): Promise<ReservationResponse>;
}
