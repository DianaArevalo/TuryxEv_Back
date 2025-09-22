import {
  Reservation,
  ReservationId,
  ReservationPaymentId,
  ReservationUserId,
} from "../entities";

export interface ReservationRepository {
  getOneByReservationId(
    reservationid: ReservationId
  ): Promise<Reservation | null>;
  getAllUserReservations(userId: ReservationUserId): Promise<Reservation[]>;
  getAllByUserId(userId: ReservationUserId): Promise<Reservation[]>;
  create(reservation: Reservation): Promise<void>;
  edit(reservation: Reservation): Promise<void>;
  confirm(paymentId: ReservationPaymentId): Promise<void>;
  cancel(reservationId: ReservationId): Promise<void>;
}
