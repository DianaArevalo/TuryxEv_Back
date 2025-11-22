import {
  ProviderDataPrimitiveArray,
  ProviderDataPrimitiveT,
  ProviderDataT,
  ProviderDataValueObject,
} from '~/lib/shared/domain';

export type UserProviderDataT = ProviderDataT;
export type UserProviderDataPrimitiveT = ProviderDataPrimitiveT;
export const UserProviderDataPrimitiveArray = ProviderDataPrimitiveArray;

export class UserProviderData extends ProviderDataValueObject {}
