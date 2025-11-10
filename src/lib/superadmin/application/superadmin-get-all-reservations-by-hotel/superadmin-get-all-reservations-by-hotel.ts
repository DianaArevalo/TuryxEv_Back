import { ForViewReservations } from '../../domain';

export class SuperAdminGetAllReservationsByHotelId {
  constructor(private readonly viewReservations: ForViewReservations) {}

  async handler(hotelId: string) {
    return this.viewReservations.getAllByHotel(hotelId);
  }
}
