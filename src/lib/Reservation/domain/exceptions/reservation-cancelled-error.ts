export class ReservationCancelledError extends Error {
  readonly statusCode: number;

  constructor(message = 'Reservation are cancelled') {
    super(message);
    this.name = 'ReservationCancelledError';
    this.statusCode = 400;

    Object.setPrototypeOf(this, ReservationCancelledError.prototype);
  }
}
