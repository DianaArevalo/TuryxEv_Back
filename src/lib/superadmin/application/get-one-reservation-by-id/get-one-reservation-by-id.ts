import { ForViewReservations } from "../../domain";

export class GetOneReservationById {
  constructor(private readonly viewReservations: ForViewReservations) {}

  async handler(reservationId: string) {
    return this.viewReservations.getOneById(reservationId);
  }
}
