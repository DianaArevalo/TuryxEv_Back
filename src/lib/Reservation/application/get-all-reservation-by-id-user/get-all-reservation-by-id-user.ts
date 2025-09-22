import { ReservationRepository, ReservationUserId } from "../../domain";

interface GetAllReservationByIdUserHandlerProps {
  userId: string;
}

export class GetAllReservationByIdUser {
  constructor(private readonly repository: ReservationRepository) {}

  async handler(props: GetAllReservationByIdUserHandlerProps) {
    return this.repository.getAllByUserId(new ReservationUserId(props.userId));
  }
}
