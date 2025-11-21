import { ValidationError } from '~/lib/shared/domain';

export type StatusT = 'OPEN' | 'CLOSED' | 'BLOCKED';
export type StatusPrimitiveT = 0 | 1 | 2;
export const StatusPrimitiveArray = [0, 1, 2];

const StatusTMap: Record<StatusT, StatusPrimitiveT> = {
  OPEN: 0,
  CLOSED: 1,
  BLOCKED: 2,
};

const StatusTReverseMap: Record<StatusPrimitiveT, StatusT> = {
  0: 'OPEN',
  1: 'CLOSED',
  2: 'BLOCKED',
};

export class StatusValueObject {
  constructor(readonly value: StatusT) {
    this.value = value;
  }

  public static create<T extends typeof StatusValueObject>(
    this: T,
    value: string,
  ): InstanceType<T> {
    if (!['OPEN', 'CLOSED', 'BLOCKED'].includes(value))
      throw new ValidationError(`Invalid statusvalue: ${value}`);

    return new this(value as StatusT) as InstanceType<T>;
  }

  public static fromPrimitives<T extends typeof StatusValueObject>(
    this: T,
    value: StatusPrimitiveT,
  ): InstanceType<T> {
    if (!(value in StatusTReverseMap))
      throw new ValidationError(`Invalid value: ${value}`);

    return new this(StatusTReverseMap[value]) as InstanceType<T>;
  }

  public toPrimitives(): StatusPrimitiveT {
    return StatusTMap[this.value];
  }
}
