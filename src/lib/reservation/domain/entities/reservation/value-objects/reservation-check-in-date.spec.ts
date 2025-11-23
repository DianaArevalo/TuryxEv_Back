import { ReservationCheckInDate } from './reservation-check-in-date';

import { HttpError } from '~/lib/shared/domain';

describe('ReservationCheckInDate - Value Object', () => {
  test('should throw if value is null', () => {
    // @ts-expect-error testing invalid param intentionally
    expect(() => ReservationCheckInDate.create(null)).toThrow(HttpError);
  });

  test('should throw if value is an invalid date', () => {
    const invalid = new Date('invalid date');
    expect(() => ReservationCheckInDate.create(invalid)).toThrow(
      'Check-in date inválido',
    );
  });

  test('should throw if value is in the past', () => {
    const now = new Date('2025-01-01T12:00:00Z');
    const past = new Date('2025-01-01T11:59:58Z'); // 2s antes

    expect(() => ReservationCheckInDate.create(past, now)).toThrow(
      'Check-in date no puede estar en el pasado',
    );
  });

  test('should throw if value equals "today" (same timestamp)', () => {
    const now = new Date('2025-01-01T12:00:00Z');
    const same = new Date('2025-01-01T12:00:00Z');

    expect(() => ReservationCheckInDate.create(same, now)).toThrow(
      'Check-in date no puede ser hoy',
    );
  });

  test('should create successfully when date is valid and in the future', () => {
    const now = new Date('2025-01-01T12:00:00Z');
    const future = new Date('2025-01-01T12:00:02Z');

    const result = ReservationCheckInDate.create(future, now);

    expect(result.value).toEqual(future);
    expect(result).toBeInstanceOf(ReservationCheckInDate);
  });
});
