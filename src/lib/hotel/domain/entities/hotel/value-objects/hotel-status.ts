import {
  StatusPrimitiveArray,
  StatusPrimitiveT,
  StatusT,
  StatusValueObject,
} from '~/lib/shared/domain';

export type HotelStatusT = StatusT;
export type HotelStatusPrimitiveT = StatusPrimitiveT;
export const HotelStatusPrimitiveArray = StatusPrimitiveArray;

export class HotelStatus extends StatusValueObject {}
