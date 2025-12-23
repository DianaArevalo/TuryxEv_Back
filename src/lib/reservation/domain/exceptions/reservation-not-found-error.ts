import { NotFoundError } from '~/lib/Shared/domain';

export class ReservationNotFoundError extends NotFoundError {
  constructor(message = 'Reservation not found') {
    super(message);
  }
}
