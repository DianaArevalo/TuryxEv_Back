import { ReservationTotalAmount } from './reservation-total-amount';

import { HttpError } from '~/lib/Shared/domain';

describe('ReservationTotalAmount - Value Object', () => {
  it('should create a valid amount', () => {
    const amount = ReservationTotalAmount.create(12.34);
    expect(amount.toPrimitives()).toBe(1234);
    expect(amount.toDecimal()).toBe(12.34);
  });

  it('should correctly round decimals', () => {
    const amount = ReservationTotalAmount.create(10.999);
    expect(amount.toPrimitives()).toBe(1100);
  });

  it('should throw an error when the amount is negative', () => {
    expect(() => ReservationTotalAmount.create(-1)).toThrow(HttpError);
  });

  it('should create successfully from valid cents', () => {
    const amount = ReservationTotalAmount.fromPrimitives(2500);
    expect(amount.toDecimal()).toBe(25);
  });

  it('should throw an error when cents are negative in fromPrimitives()', () => {
    expect(() => ReservationTotalAmount.fromPrimitives(-50)).toThrow(HttpError);
  });
});
