import { ForViewReservations } from "../../domain";

export class getAllUserReservations {
  constructor(private readonly viewReservations: ForViewReservations) {}

  async handler(userId: string) {
    return this.viewReservations.getAllUserReservations(userId);
  }
}
