import { ValidationError } from '../exeptions';

export class LocationValueObject {
  constructor(readonly value: string) {}

  static create<T extends typeof LocationValueObject>(
    this: T,
    value: string,
  ): InstanceType<T> {
    if (!value || value.trim().length === 0)
      throw new ValidationError("The city can't be empty");

    return new this(value) as InstanceType<T>;
  }
}
