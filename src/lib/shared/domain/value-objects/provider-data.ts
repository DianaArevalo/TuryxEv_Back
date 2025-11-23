import { ValidationError } from '../exeptions';

export type ProviderDataT = 'AUTH' | 'AUTHGOOGLE' | 'AUTHFACEBOOK';
export type ProviderDataPrimitiveT = 0 | 1 | 2;
export const ProviderDataPrimitiveArray = [0, 1, 2];

const ProviderDataTMap: Record<ProviderDataT, ProviderDataPrimitiveT> = {
  AUTH: 0,
  AUTHGOOGLE: 1,
  AUTHFACEBOOK: 2,
};

const ProviderDataTReverseMap: Record<ProviderDataPrimitiveT, ProviderDataT> = {
  0: 'AUTH',
  1: 'AUTHGOOGLE',
  2: 'AUTHFACEBOOK',
};
export class ProviderDataValueObject {
  constructor(readonly value: ProviderDataT) {}

  static create<T extends typeof ProviderDataValueObject>(
    this: T,
    value: string,
  ): InstanceType<T> {
    if (!Object.keys(ProviderDataTMap).includes(value)) {
      throw new ValidationError(`Invalid value: ${value}`);
    }

    return new this(value as ProviderDataT) as InstanceType<T>;
  }

  static fromPrimitives<T extends typeof ProviderDataValueObject>(
    value: ProviderDataPrimitiveT,
  ): InstanceType<T> {
    const mapped = ProviderDataTReverseMap[value];
    if (!mapped) {
      throw new ValidationError(`Invalid value: ${value}`);
    }
    return new this(mapped) as InstanceType<T>;
  }

  toPrimitives(): ProviderDataPrimitiveT {
    return ProviderDataTMap[this.value];
  }
}
