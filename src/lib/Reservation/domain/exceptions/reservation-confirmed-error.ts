export class ReservationConfirmedError extends Error {
  readonly statusCode: number;

  constructor(message = "Reservation are confirmed. Can't cancel.") {
    super(message);
    this.name = "ReservationConfirmedError";
    this.statusCode = 400;

    Object.setPrototypeOf(this, ReservationConfirmedError.prototype);
  }
}
