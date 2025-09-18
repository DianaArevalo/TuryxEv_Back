export type ReservationStatusT = "PENDING" | "CONFIRMED" | "CANCELLED";

const ReservationStatusMap: Record<ReservationStatusT, number> = {
  PENDING: 0,
  CONFIRMED: 1,
  CANCELLED: 2,
};

const ReservationStatusReverseMap: Record<number, ReservationStatusT> = {
  0: "PENDING",
  1: "CONFIRMED",
  2: "CANCELLED",
};

export class ReservationStatus {
  private constructor(readonly value: ReservationStatusT) {}

  static create(value: ReservationStatusT = "PENDING"): ReservationStatus {
    return new ReservationStatus(value);
  }

  static fromPrimitives(value: number): ReservationStatus {
    const mapped = ReservationStatusReverseMap[value];
    if (!mapped) throw new Error(`ReservationStatus inválido: ${value}`);
    return new ReservationStatus(mapped);
  }

  toPrimitives(): number {
    return ReservationStatusMap[this.value];
  }
}
