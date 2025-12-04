import { ValidationError } from "../exeptions";

export class StringValueObject {
  constructor(readonly value: string) {}

  static create<T extends typeof StringValueObject>(
    this: T,
    value: string
  ): InstanceType<T> {
    if (value.trim().length) return new this(value) as InstanceType<T>;
    throw new ValidationError("Invalid value");
  }
}
