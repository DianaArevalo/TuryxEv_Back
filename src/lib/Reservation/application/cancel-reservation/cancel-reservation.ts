import { ReservationId, ReservationRepository } from "../../domain";

interface CancelReservationHandlerProps {
  reservationId: string;
}

export class CancelReservation {
  constructor(private readonly repository: ReservationRepository) {}

  async handler(props: CancelReservationHandlerProps) {
    return this.repository.cancel(new ReservationId(props.reservationId));
  }
}
