import { ValidationError } from "../exeptions";

const DEFAULT_PAGE = 1;

export class PageValueObject {
    constructor(readonly value: number){}

  static create<T extends typeof PageValueObject>(
    this: T,
    value?: number | string,
  ): InstanceType<T> {
    if (value === undefined || value === null)
      return new this(DEFAULT_PAGE) as InstanceType<T>;

    value = Number(value);

    if (!Number.isInteger(value) || value < 1)
      throw new ValidationError(
        'Page must be a positive integer greater than 0',
      );

    return new this(value) as InstanceType<T>;
  }
}
