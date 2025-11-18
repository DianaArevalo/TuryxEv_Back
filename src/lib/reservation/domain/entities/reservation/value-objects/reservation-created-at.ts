export class ReservationCreatedAt {
  constructor(readonly value: Date) {}

  // Se usa cuando creas una nueva reserva
  static now(): ReservationCreatedAt {
    return new ReservationCreatedAt(new Date());
  }

  // Si lo quieres crear manualmente (ej: al hidratar desde API o tests)
  static create(value: Date): ReservationCreatedAt {
    if (!value) throw new Error('CreatedAt no puede ser nulo');
    if (isNaN(value.getTime())) throw new Error('CreatedAt inválido');

    const now = new Date();
    if (value > now) {
      throw new Error('CreatedAt no puede estar en el futuro');
    }

    return new ReservationCreatedAt(value);
  }
}
