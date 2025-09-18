export class ReservationTotalAmount {
  private constructor(readonly value: number) {}

  static create(value: number): ReservationTotalAmount {
    if (value < 0) {
      throw new Error("TotalAmount no puede ser negativo");
    }

    const cents = Math.round(value * 100);
    return new ReservationTotalAmount(cents);
  }

  static fromPrimitives(value: number): ReservationTotalAmount {
    return new ReservationTotalAmount(value);
  }

  toPrimitives(): number {
    return this.value;
  }

  toDecimal(): number {
    return this.value / 100;
  }
}
