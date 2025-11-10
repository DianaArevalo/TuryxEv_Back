import { ReservationCheckInDate } from '~/lib/Reservation/domain';

describe('Reservation/domain/value-objects/ReservationCheckInDate', () => {
  it('should create a valid check-in date in the future', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);

    const reservationDate = ReservationCheckInDate.create(futureDate);

    expect(reservationDate).toBeInstanceOf(ReservationCheckInDate);
    expect(reservationDate.value).toEqual(reservationDate.value);
  });

  it('should throw if date is null or undefined', () => {
    expect(() => ReservationCheckInDate.create(null)).toThrow(
      'Check-in date no puede ser nulo',
    );
    expect(() => ReservationCheckInDate.create(undefined)).toThrow(
      'Check-in date no puede ser nulo',
    );
  });

  it('should throw if date is invalid', () => {
    expect(() => ReservationCheckInDate.create(new Date('invalid'))).toThrow(
      'Check-in date inválido',
    );
  });

  it('should throw if check-in date is in the past', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    expect(() => ReservationCheckInDate.create(pastDate)).toThrow(
      'Check-in date no puede estar en el pasado',
    );
  });

  it('should throw if check-in date is today', () => {
    const today = new Date();

    expect(() => ReservationCheckInDate.create(today, today)).toThrow(
      'Check-in date no puede ser hoy',
    );
  });
});
