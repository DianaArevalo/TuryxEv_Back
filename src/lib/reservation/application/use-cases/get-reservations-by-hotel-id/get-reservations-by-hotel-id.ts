import {
  ReservationHotelId,
  ReservationRepositoryPort,
  ReservationResponse,
} from '~/lib/reservation/domain';
import { UseCase } from '~/lib/shared/application/usecase';

export interface GetReservationsByHotelIdDTO {
  hotelId: string;
}

export class GetReservationsByHotelIdUseCase
  implements UseCase<GetReservationsByHotelIdDTO, ReservationResponse[]>
{
  constructor(private readonly repository: ReservationRepositoryPort) {}

  async execute(
    props: GetReservationsByHotelIdDTO,
  ): Promise<ReservationResponse[]> {
    return (
      await this.repository.getAllByHotelId(
        new ReservationHotelId(props.hotelId),
      )
    ).map((reservation) => reservation.toResponse());
  }
}
