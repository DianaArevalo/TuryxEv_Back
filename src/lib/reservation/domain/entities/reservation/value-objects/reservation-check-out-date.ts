/*
Se usaria así:

const checkIn = ReservationCheckInDate.create(new Date("2025-09-20"));
const checkOut = ReservationCheckOutDate.create(new Date("2025-09-22"), checkIn.value);

// Para hidratar desde la BD
const checkOutFromDb = ReservationCheckOutDate.fromPrimitives("2025-09-22");
*/

export class ReservationCheckOutDate {
  constructor(readonly value: Date) {}

  // Crear un nuevo checkout desde lógica de dominio
  static create(checkOut: Date, checkIn: Date): ReservationCheckOutDate {
    if (!checkOut) throw new Error('Check-out date no puede ser nulo');
    if (isNaN(checkOut.getTime())) throw new Error('Check-out date inválido');

    if (checkOut <= checkIn) {
      throw new Error('Check-out debe ser después del check-in');
    }

    return new ReservationCheckOutDate(checkOut);
  }
}
