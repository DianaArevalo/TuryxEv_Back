import { ValidationError } from '~/lib/Shared/domain';

export class ReservationCheckInDate {
  constructor(readonly value: Date) {}

  static create(value: Date, _now?: Date): ReservationCheckInDate {
    if (!value) throw new ValidationError('Check-in date no puede ser nulo');
    if (isNaN(value.getTime()))
      throw new ValidationError('Check-in date inválido');

    const now = _now ? _now : new Date(Date.now() - 1000);

    if (value < now)
      throw new ValidationError('Check-in date no puede estar en el pasado');
    if (value.getTime() === now.getTime())
      throw new ValidationError('Check-in date no puede ser hoy');

    return new ReservationCheckInDate(value);
  }
}
