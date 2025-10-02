export class ReservationNotFoundError extends Error {
  readonly statusCode: number;

  constructor(message = "Reservation not found") {
    super(message);
    this.name = "ReservationNotFoundError";
    this.statusCode = 404;

    // Necesario para que instanceof funcione bien en TS/JS
    Object.setPrototypeOf(this, ReservationNotFoundError.prototype);
  }
}
