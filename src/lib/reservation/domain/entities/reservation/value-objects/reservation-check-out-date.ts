import { ValidationError } from '~/lib/Shared/domain';

export class ReservationCheckOutDate {
  constructor(readonly value: Date) {}

  // Crear un nuevo checkout desde lógica de dominio
  static create(checkOut: Date, checkIn: Date): ReservationCheckOutDate {
    if (!checkOut)
      throw new ValidationError('Check-out date no puede ser nulo');
    if (isNaN(checkOut.getTime()))
      throw new ValidationError('Check-out date inválido');

    if (checkOut <= checkIn) {
      throw new ValidationError('Check-out debe ser después del check-in');
    }

    return new ReservationCheckOutDate(checkOut);
  }
}
