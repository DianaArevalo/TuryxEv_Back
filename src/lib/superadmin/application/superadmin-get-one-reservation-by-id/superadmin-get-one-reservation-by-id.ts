import { ForViewReservations } from '../../domain';

export class SuperAdminGetOneReservationById {
  constructor(private readonly viewReservations: ForViewReservations) {}

  async handler(reservationId: string) {
    return this.viewReservations.getOneById(reservationId);
  }
}
