export type ProviderDataT = 'AUTH' | 'AUTHGOOGLE' | 'AUTHFACEBOOK';

const ProviderDataTMap: Record<ProviderDataT, 0 | 1 | 2> = {
  AUTH: 0,
  AUTHGOOGLE: 1,
  AUTHFACEBOOK: 2,
};

const ProviderDataTReverseMap: Record<0 | 1 | 2, ProviderDataT> = {
  0: 'AUTH',
  1: 'AUTHGOOGLE',
  2: 'AUTHFACEBOOK',
};
export class ProviderData {
  constructor(readonly value: ProviderDataT) {}

  static create(value: ProviderDataT): ProviderData {
    if (!Object.keys(ProviderDataTMap).includes(value)) {
      throw new Error(`Invalid value: ${value}`);
    }
    return new ProviderData(value);
  }

  static fromPrimitives(value: 0 | 1 | 2): ProviderData {
    const mapped = ProviderDataTReverseMap[value];
    if (!mapped) {
      throw new Error(`Invalid value: ${value}`);
    }
    return new ProviderData(mapped);
  }

  toPrimitives(): 0 | 1 | 2 {
    return ProviderDataTMap[this.value];
  }
}
