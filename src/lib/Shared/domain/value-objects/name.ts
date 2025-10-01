import { ValidationError } from "../exeptions";

export class NameValueObject {
  constructor(readonly value: string) {}

  static create(value: string) {
    if (!value || value.trim().length === 0) {
      throw new ValidationError("El nombre no puede estar vacío");
    } else if (value.length < 3) {
      throw new ValidationError("El nombre debe tener al menos 3 caracteres");
    }

    return new NameValueObject(value);
  }
}
