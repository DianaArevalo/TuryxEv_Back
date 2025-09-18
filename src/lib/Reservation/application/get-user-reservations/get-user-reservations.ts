import {
  Reservation,
  ReservationRepository,
  ReservationUserId,
} from "../../domain";

interface GetUserReservationHandlerProps {
  userId: string;
}

export class GetUserReservations {
  constructor(private readonly repository: ReservationRepository) {}

  async handler(props: GetUserReservationHandlerProps): Promise<Reservation[]> {
    return this.repository.getAllByUserId(new ReservationUserId(props.userId));
  }
}
