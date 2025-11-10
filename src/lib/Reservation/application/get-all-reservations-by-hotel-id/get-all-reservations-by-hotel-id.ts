import {
  Reservation,
  ReservationHotelId,
  ReservationRepository,
} from '../../domain';

interface GetAllByHotelIdHandlerProps {
  hotelId: string;
}

export class GetAllByHotelId {
  constructor(private readonly repository: ReservationRepository) {}

  async handler(props: GetAllByHotelIdHandlerProps): Promise<Reservation[]> {
    return this.repository.getAllByHotelId(
      new ReservationHotelId(props.hotelId),
    );
  }
}
