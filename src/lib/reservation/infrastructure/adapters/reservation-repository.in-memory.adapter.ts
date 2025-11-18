import {
  Reservation,
  ReservationHotelId,
  ReservationId,
  ReservationNotFoundError,
  ReservationPaymentId,
  ReservationRepositoryPort,
  ReservationStatus,
  ReservationUserId,
} from '../../domain';

export class ReservationRepositoryInMemoryAdapter
  implements ReservationRepositoryPort
{
  private reservations: Reservation[] = [];

  getOneByReservationId(
    reservationId: ReservationId,
  ): Promise<Reservation | null> {
    return Promise.resolve(
      this.reservations.find(
        (r) => r.reservationId.value === reservationId.value,
      ) ?? null,
    );
  }

  getAllUserReservations(userId: ReservationUserId): Promise<Reservation[]> {
    return Promise.resolve(
      this.reservations.filter((r) => r.userId.value === userId.value),
    );
  }

  getAllByHotelId(hotelId: ReservationHotelId): Promise<Reservation[]> {
    return Promise.resolve(
      this.reservations.filter((r) => r.hotelId.value === hotelId.value),
    );
  }

  create(reservation: Reservation): Promise<Reservation> {
    if (reservation.reservationId.value === '')
      reservation.reservationId = new ReservationId(
        `${reservation.userId.value}*${reservation.hotelId.value}`,
      );
    this.reservations.push(reservation);

    return Promise.resolve(reservation);
  }

  edit(reservation: Reservation): Promise<Reservation> {
    const index = this.reservations.findIndex(
      (r) => r.reservationId.value === reservation.reservationId.value,
    );
    if (index === -1) throw new ReservationNotFoundError();
    this.reservations[index] = reservation;

    return Promise.resolve(reservation);
  }

  async confirm(
    reservationId: ReservationId,
    paymentId: ReservationPaymentId,
  ): Promise<void> {
    const reservation = await this.getOneByReservationId(reservationId);
    if (!reservation) throw new ReservationNotFoundError();

    reservation.status = ReservationStatus.create('CONFIRMED');
    reservation.paymentId = paymentId;
  }

  async cancel(reservationId: ReservationId): Promise<void> {
    const reservation = await this.getOneByReservationId(reservationId);
    if (!reservation) throw new ReservationNotFoundError();

    reservation.status = ReservationStatus.create('CANCELLED');
  }
}
