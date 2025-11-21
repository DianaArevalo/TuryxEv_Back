import {
  PlanPrimitiveArray,
  PlanPrimitiveT,
  PlanT,
  PlanValueObject,
} from '~/lib/shared/domain';

export type BusinessPlanT = PlanT;
export type BusinessPlanPrimitiveT = PlanPrimitiveT;
export const BusinessPlanPrimitiveArray = PlanPrimitiveArray;

export class BusinessPlan extends PlanValueObject {}
