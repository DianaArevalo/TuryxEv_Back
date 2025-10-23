import { ForViewReservations } from "../../domain";

export class GetAllReservationsByHotelId {
  constructor(private readonly viewReservations: ForViewReservations) {}

  async handler(hotelId: string) {
    return this.viewReservations.getAllByHotel(hotelId);
  }
}
