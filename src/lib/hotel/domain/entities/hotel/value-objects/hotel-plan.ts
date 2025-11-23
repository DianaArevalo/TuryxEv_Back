import {
  PlanPrimitiveArray,
  PlanPrimitiveT,
  PlanT,
  PlanValueObject,
} from '~/lib/shared/domain';

export type HotelPlanT = PlanT;
export type HotelPrimitiveT = PlanPrimitiveT;
export const HotelPrimitiveArray = PlanPrimitiveArray;

export class HotelPlan extends PlanValueObject {}
