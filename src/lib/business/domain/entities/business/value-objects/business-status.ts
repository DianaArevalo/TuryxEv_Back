import {
  StatusPrimitiveArray,
  StatusPrimitiveT,
  StatusT,
  StatusValueObject,
} from '~/lib/shared/domain/value-objects/status';

export type BusinessStatusT = StatusT;
export type BusinessStatusPrimitiveT = StatusPrimitiveT;
export const BusinessStatusPrimitiveArray = StatusPrimitiveArray;

export class BusinessStatus extends StatusValueObject {}
