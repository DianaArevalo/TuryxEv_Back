import {
  Reservation,
  ReservationHotelId,
  ReservationId,
  ReservationNotFoundError,
  ReservationPaymentId,
  ReservationRepository,
  ReservationStatus,
  ReservationUserId,
} from "../../domain";

export class InMemoryReservationRepository implements ReservationRepository {
  private reservations: Reservation[] = [];

  async getOneByReservationId(
    reservationId: ReservationId
  ): Promise<Reservation | null> {
    return (
      this.reservations.find(
        (r) => r.reservationId.value === reservationId.value
      ) ?? null
    );
  }

  async getAllUserReservations(
    userId: ReservationUserId
  ): Promise<Reservation[]> {
    return this.reservations.filter((r) => r.userId.value === userId.value);
  }

  async getAllByHotelId(hotelId: ReservationHotelId): Promise<Reservation[]> {
    return this.reservations.filter((r) => r.hotelId.value === hotelId.value);
  }

  async create(reservation: Reservation): Promise<void> {
    if (reservation.reservationId.value === "")
      reservation.reservationId = new ReservationId(
        `${reservation.userId.value}*${reservation.hotelId.value}`
      );
    this.reservations.push(reservation);
  }

  async edit(reservation: Reservation): Promise<void> {
    const index = this.reservations.findIndex(
      (r) => r.reservationId.value === reservation.reservationId.value
    );
    if (index === -1) throw new ReservationNotFoundError();
    this.reservations[index] = reservation;
  }

  async confirm(
    reservationId: ReservationId,
    paymentId: ReservationPaymentId
  ): Promise<void> {
    const reservation = await this.getOneByReservationId(reservationId);
    if (!reservation) throw new ReservationNotFoundError();

    reservation.status = ReservationStatus.create("CONFIRMED");
    reservation.paymentId = paymentId;
  }

  async cancel(reservationId: ReservationId): Promise<void> {
    const reservation = await this.getOneByReservationId(reservationId);
    if (!reservation) throw new ReservationNotFoundError();

    reservation.status = ReservationStatus.create("CANCELLED");
  }
}
