import {
  ReservationId,
  ReservationNotFoundError,
  ReservationRepositoryPort,
  ReservationResponse,
} from '~/lib/reservation/domain';
import { UseCase } from '~/lib/Shared/application/usecase';

export interface GetReservationByIdDTO {
  reservationId: string;
}

export class GetReservationByIdUseCase
  implements UseCase<GetReservationByIdDTO, ReservationResponse>
{
  constructor(private readonly repository: ReservationRepositoryPort) {}

  async execute(props: GetReservationByIdDTO): Promise<ReservationResponse> {
    const result = await this.repository.getOneByReservationId(
      new ReservationId(props.reservationId),
    );

    if (!result) throw new ReservationNotFoundError();

    return result.toResponse();
  }
}
