import { HttpError } from '~/lib/Shared/domain';

export class ReservationConfirmedError extends HttpError {
  constructor(message = "Reservation are confirmed. Can't cancel.") {
    super(message, 400);
  }
}
