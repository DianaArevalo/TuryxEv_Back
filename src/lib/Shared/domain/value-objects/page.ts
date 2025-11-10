import { ValidationError } from '../exeptions';

const DEFAULT_PAGE = 1;
export class Page {
  constructor(readonly value: number) {}

  static create<T extends typeof Page>(
    this: T,
    value?: number,
  ): InstanceType<T> {
    if (value === undefined || value === null)
      return new this(DEFAULT_PAGE) as InstanceType<T>;

    if (!Number.isInteger(value) || value < 1)
      throw new ValidationError(
        'Page must be a positive integer greater than 0',
      );

    return new this(value) as InstanceType<T>;
  }
}
