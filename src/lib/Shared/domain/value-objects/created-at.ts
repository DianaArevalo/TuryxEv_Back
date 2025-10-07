import { ValidationError } from "../exeptions";

export class CreatedAtValueObject {
  constructor(readonly value: Date) {}

  static now() {
    return new CreatedAtValueObject(new Date());
  }

  static create(value: Date) {
    if (!value) throw new ValidationError("CreatedAt no puede ser nulo");
    if (isNaN(value.getTime())) throw new ValidationError("CreatedAt inválido");

    const now = new Date();
    if (value > now)
      throw new ValidationError("CreatedAt no puede estar en el futuro");

    return new CreatedAtValueObject(value);
  }
}
