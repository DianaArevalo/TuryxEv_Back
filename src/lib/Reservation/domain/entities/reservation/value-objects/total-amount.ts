export class ReservationTotalAmount {
  constructor(readonly value: number) {}

  static create(value: number): ReservationTotalAmount {
    if (value < 0) {
      throw new Error("TotalAmount no puede ser negativo");
    }

    const cents = Math.round(value * 100);
    return new ReservationTotalAmount(cents);
  }

  toPrimitives(): number {
    return this.value;
  }

  toDecimal(): number {
    return this.value / 100;
  }
}
