import {
  ReservationRepositoryPort,
  ReservationResponse,
  ReservationUserId,
} from '~/lib/reservation/domain';
import { UseCase } from '~/lib/shared/application/usecase';

export interface GetUserReservationsDTO {
  userId: string;
}

export class GetUserReservationsUseCase
  implements UseCase<GetUserReservationsDTO, ReservationResponse[]>
{
  constructor(private readonly repository: ReservationRepositoryPort) {}

  async execute(props: GetUserReservationsDTO): Promise<ReservationResponse[]> {
    return (
      await this.repository.getAllUserReservations(
        new ReservationUserId(props.userId),
      )
    ).map((reservation) => reservation.toResponse());
  }
}
