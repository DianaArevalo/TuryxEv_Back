import {
  PlanPrimitiveArray,
  PlanPrimitiveT,
  PlanT,
  PlanValueObject,
} from '~/lib/shared/domain';

export type UserPlanT = PlanT;
export type UserPlanPrimitiveT = PlanPrimitiveT;
export const UserPlanPrimitiveArray = PlanPrimitiveArray;

export class UserPlan extends PlanValueObject {}
