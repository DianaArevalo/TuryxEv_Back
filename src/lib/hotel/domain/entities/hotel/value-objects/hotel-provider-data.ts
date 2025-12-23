import {
  ProviderDataPrimitiveArray,
  ProviderDataPrimitiveT,
  ProviderDataT,
  ProviderDataValueObject,
} from '~/lib/Shared/domain';

export type HotelProviderDataT = ProviderDataT;
export type HotelProviderDataPrimitiveT = ProviderDataPrimitiveT;
export const HotelProviderDataPrimitiveArray = ProviderDataPrimitiveArray;

export class HotelProviderData extends ProviderDataValueObject {}
