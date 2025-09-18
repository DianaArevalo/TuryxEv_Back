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
  getAllByUserId(userId: ReservationUserId): Promise<Reservation[]>;
  getAllByHotelId(hotelId: ReservationHotelId): Promise<Reservation[]>;
  create(reservation: Reservation): Promise<void>;
  edit(reservation: Reservation): Promise<void>;
  confirm(paymentId: ReservationPaymentId): Promise<void>;
  cancel(reservationId: ReservationId): Promise<void>;
}
