import { ValidationError } from '~/lib/shared/domain';

export type ReservationStatusT = 'PENDING' | 'CONFIRMED' | 'CANCELLED';
export type ReservationStatusPrimitiveT = 0 | 1 | 2;
export const ReservationStatusPrimitiveArray = [0, 1, 2];

const ReservationStatusMap: Record<
  ReservationStatusT,
  ReservationStatusPrimitiveT
> = {
  PENDING: 0,
  CONFIRMED: 1,
  CANCELLED: 2,
};

const ReservationStatusReverseMap: Record<
  ReservationStatusPrimitiveT,
  ReservationStatusT
> = {
  0: 'PENDING',
  1: 'CONFIRMED',
  2: 'CANCELLED',
};

export class ReservationStatus {
  constructor(readonly value: ReservationStatusT) {}

  static create(value: ReservationStatusT = 'PENDING'): ReservationStatus {
    return new ReservationStatus(value);
  }

  static fromPrimitives(value: ReservationStatusPrimitiveT): ReservationStatus {
    const mapped = ReservationStatusReverseMap[value];
    if (!mapped)
      throw new ValidationError(`ReservationStatus inválido: ${value}`);
    return new ReservationStatus(mapped);
  }

  toPrimitives(): ReservationStatusPrimitiveT {
    return ReservationStatusMap[this.value];
  }
}
