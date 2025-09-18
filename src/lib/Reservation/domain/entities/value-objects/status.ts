export type ReservationStatusT = "PENDING" | "CONFIRMED" | "CANCELLED";

export class ReservationStatus {
  value: ReservationStatusT;

  constructor(value: ReservationStatusT) {
    this.value = value;
  }
}
