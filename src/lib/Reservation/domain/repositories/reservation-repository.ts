import {
  Reservation,
  ReservationHotelId,
  ReservationId,
  ReservationPaymentId,
  ReservationUserId,
} from "../entities";

export interface ReservationRepository {
  getByUserId(userId: ReservationUserId): Promise<Reservation[]>;
  getByHotelId(hotelId: ReservationHotelId): Promise<Reservation[]>;
  create(reservation: Reservation): Promise<void>;
  confirm(paymentId: ReservationPaymentId): Promise<void>;
  cancel(reservationId: ReservationId): Promise<void>;
}
