import {
  ReservationCheckInDate,
  ReservationCheckOutDate,
  ReservationId,
  ReservationNotFoundError,
  ReservationRepository,
  ReservationUpdatedAt,
} from '../../domain';

interface EditReservationHanlderProps {
  reservationId: string;
  checkInDate?: Date;
  checkOutDate?: Date;
}

export class EditReservation {
  constructor(private readonly repository: ReservationRepository) {}

  async handler(props: EditReservationHanlderProps) {
    if (!props.checkInDate && !props.checkOutDate) return;

    const reservation = await this.repository.getOneByReservationId(
      new ReservationId(props.reservationId),
    );

    if (!reservation) throw new ReservationNotFoundError();

    let hasChanges = false;

    if (props.checkInDate) {
      if (
        (props.checkOutDate && props.checkInDate < props.checkOutDate) ||
        (!props.checkOutDate &&
          props.checkInDate < reservation.checkOutDate.value)
      ) {
        reservation.checkInDate = ReservationCheckInDate.create(
          props.checkInDate,
        );
        hasChanges = true;
      } else throw new Error('Check-in date inválido');
    }

    if (
      props.checkOutDate &&
      props.checkOutDate !== reservation.checkOutDate.value
    ) {
      reservation.checkOutDate = ReservationCheckOutDate.create(
        props.checkOutDate,
        reservation.checkInDate.value,
      );
      hasChanges = true;
    }

    if (!hasChanges) return;

    reservation.updatedAt = ReservationUpdatedAt.create(
      new Date(),
      reservation.createdAt,
    );

    const edited = await this.repository.edit(reservation);

    return edited.toResponse();
  }
}
