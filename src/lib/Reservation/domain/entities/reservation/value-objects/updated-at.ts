import { ReservationCreatedAt } from "./created-at";

export class ReservationUpdatedAt {
  private constructor(readonly value: Date) {}

  // Cuando se actualiza la reserva → se setea automáticamente
  static now(createdAt: ReservationCreatedAt): ReservationUpdatedAt {
    return this.create(new Date(), createdAt);
  }

  // Crear manualmente (ej: tests)
  static create(
    value: Date,
    createdAt: ReservationCreatedAt
  ): ReservationUpdatedAt {
    if (!value) throw new Error("UpdatedAt no puede ser nulo");
    if (isNaN(value.getTime())) throw new Error("UpdatedAt inválido");

    const now = new Date();
    if (value > now) {
      throw new Error("UpdatedAt no puede estar en el futuro");
    }

    if (value < createdAt.value) {
      throw new Error("UpdatedAt no puede ser menor que CreatedAt");
    }

    return new ReservationUpdatedAt(value);
  }

  // Rehidratar desde la BD sin validaciones
  static fromPrimitives(value: string | Date): ReservationUpdatedAt {
    const date = typeof value === "string" ? new Date(value) : value;
    return new ReservationUpdatedAt(date);
  }

  toPrimitives(): Date {
    return this.value;
  }
}
