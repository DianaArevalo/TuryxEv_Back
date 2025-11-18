import {
  Reservation,
  ReservationId,
  ReservationNotFoundError,
  ReservationRepository,
} from '../../domain';

interface GetOneByReservationIdHandlerProps {
  reservationId: string;
}

export class GetOneByReservationId {
  constructor(private readonly repository: ReservationRepository) {}

  async handler(
    props: GetOneByReservationIdHandlerProps,
  ): Promise<Reservation> {
    const result = await this.repository.getOneByReservationId(
      new ReservationId(props.reservationId),
    );

    if (!result) throw new ReservationNotFoundError();

    return result;
  }
}
