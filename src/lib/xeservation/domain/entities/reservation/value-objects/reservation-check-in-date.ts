// Se hace esto para no ejecutar la validacion cada q se trae de la BD
// Si se quiere validar, es solo hacer `ReservationCheckInDate.create(date)`
export class ReservationCheckInDate {
  constructor(readonly value: Date) {}

  // Para crear uno nuevo desde lógica de dominio
  static create(value: Date, _now?: Date): ReservationCheckInDate {
    if (!value) throw new Error('Check-in date no puede ser nulo');
    if (isNaN(value.getTime())) throw new Error('Check-in date inválido');

    const now = _now ? _now : new Date(Date.now() - 1000);

    if (value < now)
      throw new Error('Check-in date no puede estar en el pasado');
    if (value.getTime() === now.getTime())
      throw new Error('Check-in date no puede ser hoy');

    return new ReservationCheckInDate(value);
  }
}
