import { HttpError } from '~/lib/shared/domain';

export class ReservationCancelledError extends HttpError {
  constructor(message = 'Reservation are cancelled') {
    super(message, 400);
  }
}
