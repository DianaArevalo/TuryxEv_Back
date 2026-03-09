import {
  PlanPrimitiveArray,
  PlanPrimitiveT,
  PlanT,
  PlanValueObject,
} from '~/lib/Shared/domain';

export type HotelPlanT = PlanT;
export type HotelPrimitiveT = PlanPrimitiveT;
export const HotelPrimitiveArray = PlanPrimitiveArray;

export class HotelPlan extends PlanValueObject {}
