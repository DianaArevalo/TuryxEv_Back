import {
  ReservationCheckInDate,
  ReservationCheckOutDate,
  ReservationId,
  ReservationNotFoundError,
  ReservationRepositoryPort,
  ReservationResponse,
  ReservationUpdatedAt,
} from '~/lib/reservation/domain';
import { UseCase } from '~/lib/shared/application';
import { ValidationError } from '~/lib/shared/domain';

export interface EditReservationDTO {
  reservationId: string;
  checkInDate?: Date;
  checkOutDate?: Date;
}

export class EditReservationUseCase
  implements UseCase<EditReservationDTO, EditReservationDTO | null>
{
  constructor(private readonly repository: ReservationRepositoryPort) {}

  async execute(
    props: EditReservationDTO,
  ): Promise<ReservationResponse | null> {
    const { checkInDate, checkOutDate, reservationId } = props;

    if (!checkInDate && !checkOutDate) return null;

    const reservation = await this.repository.getOneByReservationId(
      new ReservationId(reservationId),
    );
    if (!reservation) throw new ReservationNotFoundError();

    let hasChanges = false;

    // --- CHECK-IN ---
    if (checkInDate && checkInDate !== reservation.checkInDate.value) {
      const effectiveCheckOut = checkOutDate ?? reservation.checkOutDate.value;

      if (checkInDate >= effectiveCheckOut) {
        throw new ValidationError('Invalid check-in date.');
      }

      reservation.checkInDate = ReservationCheckInDate.create(checkInDate);
      hasChanges = true;
    }

    // --- CHECK-OUT ---
    if (checkOutDate && checkOutDate !== reservation.checkOutDate.value) {
      reservation.checkOutDate = ReservationCheckOutDate.create(
        checkOutDate,
        reservation.checkInDate.value,
      );

      hasChanges = true;
    }

    if (!hasChanges) return null;

    reservation.updatedAt = ReservationUpdatedAt.create(
      new Date(),
      reservation.createdAt,
    );

    const edited = await this.repository.edit(reservation);
    return edited.toResponse();
  }
}
