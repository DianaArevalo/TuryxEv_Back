import {
  Reservation,
  ReservationHotelId,
  ReservationId,
  ReservationPaymentId,
  ReservationUserId,
} from "../entities";

export interface ReservationRepository {
  getOneByReservationId(
    reservationid: ReservationId
  ): Promise<Reservation | null>;
  // Reservas de un usuario
  getAllUserReservations(userId: ReservationUserId): Promise<Reservation[]>;
  // Reservas que recive un hotel
  getAllByHotelId(hotelId: ReservationHotelId): Promise<Reservation[]>;
  create(reservation: Reservation): Promise<void>;
  edit(reservation: Reservation): Promise<void>;
  confirm(
    reservationid: ReservationId,
    paymentId: ReservationPaymentId
  ): Promise<void>;
  cancel(reservationId: ReservationId): Promise<void>;
}
