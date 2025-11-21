import { ValidationError } from '../exeptions';

export class ScoreValueObject {
  constructor(readonly value: number) {}

  static create<T extends typeof ScoreValueObject>(
    this: T,
    value: number,
  ): InstanceType<T> {
    if (value < 0 || value > 5)
      throw new ValidationError('El score debe estar entre 0 y 5');

    return new this(value) as InstanceType<T>;
  }
}
