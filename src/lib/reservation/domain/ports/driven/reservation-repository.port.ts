import {
  Reservation,
  ReservationHotelId,
  ReservationId,
  ReservationPaymentId,
  ReservationUserId,
} from '../../entities';

export interface ReservationRepositoryPort {
  getOneByReservationId(
    reservationId: ReservationId,
  ): Promise<Reservation | null>;
  getAllUserReservations(userId: ReservationUserId): Promise<Reservation[]>;
  getAllByHotelId(hotelId: ReservationHotelId): Promise<Reservation[]>;
  create(reservation: Reservation): Promise<Reservation>;
  edit(reservation: Reservation): Promise<Reservation>;
  confirm(
    reservationId: ReservationId,
    paymentId: ReservationPaymentId,
  ): Promise<void>;
  cancel(reservationId: ReservationId): Promise<void>;
}
