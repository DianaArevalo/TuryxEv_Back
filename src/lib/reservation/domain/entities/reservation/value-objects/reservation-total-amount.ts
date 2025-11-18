import { ValidationError } from '~/lib/Shared/domain';

export class ReservationTotalAmount {
  private constructor(readonly value: number) {}

  static create(value: number): ReservationTotalAmount {
    if (value < 0)
      throw new ValidationError('TotalAmount no puede ser negativo');

    const cents = Math.round(value * 100);
    return new ReservationTotalAmount(cents);
  }

  static fromPrimitives(cents: number): ReservationTotalAmount {
    if (cents < 0)
      throw new ValidationError('TotalAmount no puede ser negativo');
    return new ReservationTotalAmount(cents);
  }

  toPrimitives(): number {
    return this.value;
  }

  toDecimal(): number {
    return this.value / 100;
  }
}
