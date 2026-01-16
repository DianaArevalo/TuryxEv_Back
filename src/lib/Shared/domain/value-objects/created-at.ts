import { ValidationError } from "../exeptions";

export class CreatedAtValueObject {
  constructor(readonly value: Date) {}

  static create(value: Date) {
    const now = new Date();
    const toleranceMs = 1000; // 1 segundo de margen

    if (!value) throw new ValidationError("CreatedAt no puede ser nulo");
    if (isNaN(value.getTime())) throw new ValidationError("CreatedAt inválido");
    if (value.getTime() > now.getTime() + toleranceMs)
      throw new ValidationError("CreatedAt no puede estar en el futuro");

    return new CreatedAtValueObject(value);
  }

  static now(): CreatedAtValueObject {
    return new CreatedAtValueObject(new Date());
  }

  toPrimitives(): Date {
    return this.value;
  }
}
