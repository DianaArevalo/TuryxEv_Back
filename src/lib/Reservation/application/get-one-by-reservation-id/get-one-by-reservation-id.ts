import {
  Reservation,
  ReservationId,
  ReservationRepository,
} from "../../domain";

interface GetOneByReservationIdHandlerProps {
  reservationId: string;
}

export class GetOneByReservationId {
  constructor(private readonly repository: ReservationRepository) {}

  async handler(
    props: GetOneByReservationIdHandlerProps
  ): Promise<Reservation | null> {
    return this.repository.getOneByReservationId(
      new ReservationId(props.reservationId)
    );
  }
}
