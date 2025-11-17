import { ValidationError } from '../../../../../Shared/domain/exeptions';

export type BusinessPlanT = 'FREE' | 'BASIC' | 'PREMIUM';
export type BusinessPlanPrimitiveT = 0 | 1 | 2;
export const BusinessPlanPrimitiveArray = [0, 1, 2];

const BusinessPlanTMap: Record<BusinessPlanT, BusinessPlanPrimitiveT> = {
  FREE: 0,
  BASIC: 1,
  PREMIUM: 2,
};

const BusinessPlanTReverseMap: Record<BusinessPlanPrimitiveT, BusinessPlanT> = {
  0: 'FREE',
  1: 'BASIC',
  2: 'PREMIUM',
};

export class BusinessPlan {
  constructor(readonly value: BusinessPlanT) {}

  static create(value: string): BusinessPlan {
    if (!['FREE', 'BASIC', 'PREMIUM'].includes(value))
      throw new ValidationError(`Invalid value: ${value}`);

    return new BusinessPlan(value as BusinessPlanT);
  }

  static fromPrimitives(value: BusinessPlanPrimitiveT): BusinessPlan {
    const mapped = BusinessPlanTReverseMap[value];
    if (!mapped) throw new ValidationError(`Invalid value: ${value}`);

    return new BusinessPlan(mapped);
  }

  toPrimitives(): BusinessPlanPrimitiveT {
    return BusinessPlanTMap[this.value];
  }
}
