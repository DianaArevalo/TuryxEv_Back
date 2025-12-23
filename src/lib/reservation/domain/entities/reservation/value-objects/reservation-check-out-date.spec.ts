import { ReservationCheckOutDate } from './reservation-check-out-date';

describe('ReservationCheckOutDate - Value Object', () => {
  test('should throw if checkOut is null', () => {
    const checkIn = new Date('2025-01-01T10:00:00Z');
    // @ts-expect-error testing invalid param
    expect(() => ReservationCheckOutDate.create(null, checkIn)).toThrow(
      'Check-out date no puede ser nulo',
    );
  });

  test('should throw if checkOut is an invalid date', () => {
    const invalid = new Date('invalid');
    const checkIn = new Date('2025-01-01T10:00:00Z');

    expect(() => ReservationCheckOutDate.create(invalid, checkIn)).toThrow(
      'Check-out date inválido',
    );
  });

  test('should throw if checkOut is equal to checkIn', () => {
    const checkIn = new Date('2025-01-01T10:00:00Z');
    const checkOut = new Date('2025-01-01T10:00:00Z');

    expect(() => ReservationCheckOutDate.create(checkOut, checkIn)).toThrow(
      'Check-out debe ser después del check-in',
    );
  });

  test('should throw if checkOut is before checkIn', () => {
    const checkIn = new Date('2025-01-01T10:00:00Z');
    const checkOut = new Date('2025-01-01T09:59:59Z');

    expect(() => ReservationCheckOutDate.create(checkOut, checkIn)).toThrow(
      'Check-out debe ser después del check-in',
    );
  });

  test('should create when checkOut is after checkIn', () => {
    const checkIn = new Date('2025-01-01T10:00:00Z');
    const checkOut = new Date('2025-01-01T10:00:01Z');

    const result = ReservationCheckOutDate.create(checkOut, checkIn);

    expect(result.value).toEqual(checkOut);
    expect(result).toBeInstanceOf(ReservationCheckOutDate);
  });
});
