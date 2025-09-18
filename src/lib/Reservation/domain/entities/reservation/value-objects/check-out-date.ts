/*
Se usaria así:

const checkIn = ReservationCheckInDate.create(new Date("2025-09-20"));
const checkOut = ReservationCheckOutDate.create(new Date("2025-09-22"), checkIn.value);

// Para hidratar desde la BD
const checkOutFromDb = ReservationCheckOutDate.fromPrimitives("2025-09-22");
*/

export class ReservationCheckOutDate {
  private constructor(readonly value: Date) {}

  // Crear un nuevo checkout desde lógica de dominio
  static create(checkOut: Date, checkIn: Date): ReservationCheckOutDate {
    if (!checkOut) throw new Error("Check-out date no puede ser nulo");
    if (isNaN(checkOut.getTime())) throw new Error("Check-out date inválido");

    const normalizedCheckOut = new Date(
      checkOut.getFullYear(),
      checkOut.getMonth(),
      checkOut.getDate()
    );

    const normalizedCheckIn = new Date(
      checkIn.getFullYear(),
      checkIn.getMonth(),
      checkIn.getDate()
    );

    if (normalizedCheckOut <= normalizedCheckIn) {
      throw new Error("Check-out debe ser después del check-in");
    }

    return new ReservationCheckOutDate(normalizedCheckOut);
  }

  // Reconstruir desde la BD sin validaciones
  static fromPrimitives(value: string | Date): ReservationCheckOutDate {
    const date = typeof value === "string" ? new Date(value) : value;
    return new ReservationCheckOutDate(date);
  }
}
