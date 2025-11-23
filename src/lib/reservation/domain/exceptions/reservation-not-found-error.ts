import { NotFoundError } from '~/lib/shared/domain';

export class ReservationNotFoundError extends NotFoundError {
  constructor(message = 'Reservation not found') {
    super(message);
  }
}
