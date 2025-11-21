import { HttpError } from '~/lib/shared/domain';

export class ReservationConfirmedError extends HttpError {
  constructor(message = "Reservation are confirmed. Can't cancel.") {
    super(message, 400);
  }
}
