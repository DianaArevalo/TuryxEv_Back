import {
  ReservationConfirmedError,
  ReservationId,
  ReservationNotFoundError,
  ReservationRepository,
} from "../../domain";

interface CancelReservationHandlerProps {
  reservationId: string;
}

export class CancelReservation {
  constructor(private readonly repository: ReservationRepository) {}

  async handler(props: CancelReservationHandlerProps) {
    const reservation = await this.repository.getOneByReservationId(
      new ReservationId(props.reservationId)
    );

    if (!reservation) throw new ReservationNotFoundError();

    if (reservation.status.value === "CONFIRMED")
      throw new ReservationConfirmedError();

    return this.repository.cancel(new ReservationId(props.reservationId));
  }
}
