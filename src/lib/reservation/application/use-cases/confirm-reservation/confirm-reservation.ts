import {
  ReservationCancelledError,
  ReservationId,
  ReservationNotFoundError,
  ReservationPaymentId,
  ReservationRepositoryPort,
} from '~/lib/reservation/domain';
import { UseCase } from '~/lib/shared/application';

export interface ConfirmReservationDTO {
  reservationId: string;
  paymentId: string;
}

export class ConfirmReservationUseCase
  implements UseCase<ConfirmReservationDTO, void>
{
  constructor(private readonly repository: ReservationRepositoryPort) {}

  async execute(props: ConfirmReservationDTO) {
    const reservation = await this.repository.getOneByReservationId(
      new ReservationId(props.reservationId),
    );

    if (!reservation) throw new ReservationNotFoundError();

    if (reservation.status.value === 'CANCELLED')
      throw new ReservationCancelledError();

    // TODO: validar el paymentId
    return this.repository.confirm(
      new ReservationId(props.reservationId),
      new ReservationPaymentId(props.paymentId),
    );
  }
}
