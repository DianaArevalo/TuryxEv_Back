import { ReservationId, ReservationRepository } from "../../domain";

interface ConfirmReservationHandlerProps {
  reservationId: string;
}

export class ConfirmReservation {
  constructor(private readonly repository: ReservationRepository) {}

  async handler(props: ConfirmReservationHandlerProps) {
    return this.repository.confirm(new ReservationId(props.reservationId));
  }
}
