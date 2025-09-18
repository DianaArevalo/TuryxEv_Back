// Se hace esto para no ejecutar la validacion cada q se trae de la BD
// Si se quiere validar, es solo hacer `ReservationCheckInDate.create(date)`
export class ReservationCheckInDate {
  private constructor(readonly value: Date) {}

  // Para crear uno nuevo desde lógica de dominio
  static create(value: Date): ReservationCheckInDate {
    if (!value) throw new Error("Check-in date no puede ser nulo");
    if (isNaN(value.getTime())) throw new Error("Check-in date inválido");

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const checkIn = new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate()
    );

    if (checkIn < today)
      throw new Error("Check-in date no puede estar en el pasado");
    if (checkIn.getTime() === today.getTime())
      throw new Error("Check-in date no puede ser hoy");

    return new ReservationCheckInDate(checkIn);
  }

  // Para rehidratar desde la BD sin validar
  static fromPrimitives(value: string | Date): ReservationCheckInDate {
    const date = typeof value === "string" ? new Date(value) : value;
    return new ReservationCheckInDate(date);
  }
}
