import {
  ReservationId,
  ReservationPaymentId,
  ReservationRepository,
} from "../../domain";

interface ConfirmReservationHandlerProps {
  reservationId: string;
  paymentId: string;
}

export class ConfirmReservation {
  constructor(private readonly repository: ReservationRepository) {}

  async handler(props: ConfirmReservationHandlerProps) {
    return this.repository.confirm(
      new ReservationId(props.reservationId),
      new ReservationPaymentId(props.paymentId)
    );
  }
}
