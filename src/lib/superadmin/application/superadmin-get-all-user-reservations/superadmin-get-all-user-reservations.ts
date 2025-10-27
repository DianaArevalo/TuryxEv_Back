import { ForViewReservations } from "../../domain";

export class SuperAdminGetAllUserReservations {
  constructor(private readonly viewReservations: ForViewReservations) {}

  async handler(userId: string) {
    return this.viewReservations.getAllUserReservations(userId);
  }
}
