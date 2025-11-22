import {
  ReservationConfirmedError,
  ReservationId,
  ReservationNotFoundError,
  ReservationRepositoryPort,
} from '~/lib/reservation/domain';
import { UseCase } from '~/lib/shared/application';

export interface CancelReservationDTO {
  reservationId: string;
}

export class CancelReservationUseCase
  implements UseCase<CancelReservationDTO, void>
{
  constructor(private readonly repository: ReservationRepositoryPort) {}

  async execute(props: CancelReservationDTO): Promise<void> {
    const reservation = await this.repository.getOneByReservationId(
      new ReservationId(props.reservationId),
    );

    if (!reservation) throw new ReservationNotFoundError();

    if (reservation.status.value === 'CONFIRMED')
      throw new ReservationConfirmedError();

    return this.repository.cancel(new ReservationId(props.reservationId));
  }
}
