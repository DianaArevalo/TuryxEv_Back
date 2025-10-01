import { ValidationError } from "../exeptions";

export class LocationValueObject {
  constructor(readonly value: string) {}

  static create(value: string) {
    if (!value || value.trim().length === 0)
      throw new ValidationError("The city can't be empty");

    return new LocationValueObject(value);
  }
}
