import {
  ReservationCancelledError,
  ReservationId,
  ReservationNotFoundError,
  ReservationPaymentId,
  ReservationRepository,
} from '../../domain';

interface ConfirmReservationHandlerProps {
  reservationId: string;
  paymentId: string;
}

export class ConfirmReservation {
  constructor(private readonly repository: ReservationRepository) {}

  async handler(props: ConfirmReservationHandlerProps) {
    const reservation = await this.repository.getOneByReservationId(
      new ReservationId(props.reservationId),
    );

    if (!reservation) throw new ReservationNotFoundError();

    if (reservation.status.value === 'CANCELLED')
      throw new ReservationCancelledError();

    // TODO: validar el paymentId
    return this.repository.confirm(
      new ReservationId(props.reservationId),
      new ReservationPaymentId(props.paymentId),
    );
  }
}
