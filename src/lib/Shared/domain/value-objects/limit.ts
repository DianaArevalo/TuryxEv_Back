import { ValidationError } from "../exeptions";

const DEFAULT_LIMIT = 50;

export class LimitValueObject {
  constructor(readonly value: number) {}

  static create<T extends typeof LimitValueObject>(
    this: T,
    value?: number | string,
  ): InstanceType<T> {
    if (value === undefined || value === null)
      return new this(DEFAULT_LIMIT) as InstanceType<T>;

    value = Number(value);

    if (!Number.isInteger(value))
      throw new ValidationError('Limit must be an integer');

    if (value <= 0 || value > 1000)
      throw new ValidationError(
        'Limit must be greater than 0 and less than 1000',
      );

    return new this(value) as InstanceType<T>;
  }
}
