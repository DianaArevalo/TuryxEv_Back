import { ValidationError } from "../exeptions";

export class ScoreValueObject {
  constructor(readonly value: number) {}

  static create(value: number) {
    if (value < 0 || value > 5)
      throw new ValidationError("El score debe estar entre 0 y 5");

    return new ScoreValueObject(value);
  }
}
