import { ValidationError } from "../../../../../Shared/domain/exeptions";

export type BusinessPlanT = "FREE" | "BASIC" | "PREMIUM";

const BusinessPlanTMap: Record<BusinessPlanT, 0 | 1 | 2> = {
  FREE: 0,
  BASIC: 1,
  PREMIUM: 2,
};

const BusinessPlanTReverseMap: Record<0 | 1 | 2, BusinessPlanT> = {
  0: "FREE",
  1: "BASIC",
  2: "PREMIUM",
};

export class BusinessPlan {
  constructor(readonly value: BusinessPlanT) {}

  static create(value: string): BusinessPlan {
    if (!Object.values(BusinessPlanTReverseMap).includes(value as any))
      throw new ValidationError(`Invalid value: ${value}`);

    return new BusinessPlan(value as BusinessPlanT);
  }

  static fromPrimitives(value: 0 | 1 | 2): BusinessPlan {
    const mapped = BusinessPlanTReverseMap[value];
    if (!mapped) {
      throw new ValidationError(`Invalid value: ${value}`);
    }
    return new BusinessPlan(mapped);
  }

  toPrimitives(): 0 | 1 | 2 {
    return BusinessPlanTMap[this.value as BusinessPlanT];
  }
}
