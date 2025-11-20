import { ValidationError } from '~/lib/Shared/domain';

export type PlanT = 'FREE' | 'BASIC' | 'PREMIUM';
export type PlanPrimitiveT = 0 | 1 | 2;
export const PlanPrimitiveArray = [0, 1, 2];

const PlanTMap: Record<PlanT, PlanPrimitiveT> = {
  FREE: 0,
  BASIC: 1,
  PREMIUM: 2,
};

const PlanTReverseMap: Record<PlanPrimitiveT, PlanT> = {
  0: 'FREE',
  1: 'BASIC',
  2: 'PREMIUM',
};

export class PlanValueObject {
  constructor(readonly value: PlanT) {}

  static create<T extends typeof PlanValueObject>(
    this: T,
    value: string,
  ): InstanceType<T> {
    if (!['FREE', 'BASIC', 'PREMIUM'].includes(value))
      throw new ValidationError(`Invalid value: ${value}`);

    return new this(value as PlanT) as InstanceType<T>;
  }

  static fromPrimitives<T extends typeof PlanValueObject>(
    this: T,
    value: PlanPrimitiveT,
  ): InstanceType<T> {
    const mapped = PlanTReverseMap[value];
    if (!mapped) throw new ValidationError(`Invalid value: ${value}`);

    return new this(mapped) as InstanceType<T>;
  }

  toPrimitives(): PlanPrimitiveT {
    return PlanTMap[this.value];
  }
}
