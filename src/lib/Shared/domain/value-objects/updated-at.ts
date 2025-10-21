import { ValidationError } from "../exeptions";
import { CreatedAtValueObject } from "./created-at";

export class UpdatedAtValueObject {
  constructor(readonly value: Date) {}

  static now(createdAt: CreatedAtValueObject) {
    return this.create(new Date(), createdAt);
  }

  static create(value: Date, createdAt: CreatedAtValueObject) {
    if (!value) throw new ValidationError("UpdatedAt no puede ser nulo");
    if (isNaN(value.getTime())) throw new ValidationError("UpdatedAt inválido");

    const now = new Date();
    if (value > now) {
      throw new ValidationError("UpdatedAt no puede estar en el futuro");
    }

    if (value < createdAt.value) {
      throw new ValidationError("UpdatedAt no puede ser menor que CreatedAt");
    }

    return new UpdatedAtValueObject(value);
  }
}
