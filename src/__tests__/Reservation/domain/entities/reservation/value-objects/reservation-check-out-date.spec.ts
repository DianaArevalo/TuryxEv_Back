import { ReservationCheckOutDate } from '~/lib/Reservation/domain';

describe('Reservation/domain/value-objects/ReservationCheckOutDate', () => {
  const checkIn = new Date(2025, 8, 20); // Sept 20, 2025

  it('should create a valid check-out date after check-in', () => {
    const checkOut = new Date(2025, 8, 22); // Sept 22, 2025

    const reservationCheckOut = ReservationCheckOutDate.create(
      checkOut,
      checkIn,
    );

    expect(reservationCheckOut).toBeInstanceOf(ReservationCheckOutDate);
    expect(reservationCheckOut.value).toEqual(
      new Date(checkOut.getFullYear(), checkOut.getMonth(), checkOut.getDate()),
    );
  });

  it('should throw if check-out date is null or undefined', () => {
    expect(() => ReservationCheckOutDate.create(null, checkIn)).toThrow(
      'Check-out date no puede ser nulo',
    );
    expect(() => ReservationCheckOutDate.create(undefined, checkIn)).toThrow(
      'Check-out date no puede ser nulo',
    );
  });

  it('should throw if check-out date is invalid', () => {
    expect(() =>
      ReservationCheckOutDate.create(new Date('invalid'), checkIn),
    ).toThrow('Check-out date inválido');
  });

  it('should throw if check-out date is the same as check-in date', () => {
    const sameDay = new Date(2025, 8, 20);

    expect(() => ReservationCheckOutDate.create(sameDay, checkIn)).toThrow(
      'Check-out debe ser después del check-in',
    );
  });

  it('should throw if check-out date is before check-in date', () => {
    const beforeCheckIn = new Date(2025, 8, 19);

    expect(() =>
      ReservationCheckOutDate.create(beforeCheckIn, checkIn),
    ).toThrow('Check-out debe ser después del check-in');
  });
});
