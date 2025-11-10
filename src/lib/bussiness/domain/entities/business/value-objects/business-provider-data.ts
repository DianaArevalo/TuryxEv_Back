export type BusinessProviderDataT = 'AUTH' | 'AUTHGOOGLE' | 'AUTHFACEBOOK';

const BusinessProviderDataTMap: Record<BusinessProviderDataT, 0 | 1 | 2> = {
  AUTH: 0,
  AUTHGOOGLE: 1,
  AUTHFACEBOOK: 2,
};

const BusinessProviderDataTReverseMap: Record<
  0 | 1 | 2,
  BusinessProviderDataT
> = {
  0: 'AUTH',
  1: 'AUTHGOOGLE',
  2: 'AUTHFACEBOOK',
};
export class BusinessProviderData {
  constructor(readonly value: BusinessProviderDataT) {}

  static create(value: string): BusinessProviderData {
    if (!['AUTH', 'AUTHGOOGLE', 'AUTHFACEBOOK'].includes(value))
      throw new Error(`Invalid value: ${value}`);

    return new BusinessProviderData(value as BusinessProviderDataT);
  }

  static fromPrimitives(value: 0 | 1 | 2): BusinessProviderData {
    const mapped = BusinessProviderDataTReverseMap[value];
    if (!mapped) {
      throw new Error(`Invalid value: ${value}`);
    }
    return new BusinessProviderData(mapped);
  }

  toPrimitives(): 0 | 1 | 2 {
    return BusinessProviderDataTMap[this.value];
  }
}
