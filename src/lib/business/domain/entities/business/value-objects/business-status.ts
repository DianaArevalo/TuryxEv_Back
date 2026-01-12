import { ValidationError } from '../../../../../../lib/Shared/domain';

export type BusinessStatusT = 'OPEN' | 'CLOSED' | 'BLOCKED';
export type BusinessStatusPrimitiveT = 0 | 1 | 2;
export const BusinessStatusPrimitiveArray = [0, 1, 2];

const BusinessStatusTMap: Record<BusinessStatusT, BusinessStatusPrimitiveT> = {
  OPEN: 0,
  CLOSED: 1,
  BLOCKED: 2,
};

const BusinessStatusTReverseMap: Record<
  BusinessStatusPrimitiveT,
  BusinessStatusT
> = {
  0: 'OPEN',
  1: 'CLOSED',
  2: 'BLOCKED',
};
export class BusinessStatus {
  constructor(readonly value: BusinessStatusT) {
    this.value = value;
  }

  public static create(value: string): BusinessStatus {
    if (!['OPEN', 'CLOSED', 'BLOCKED'].includes(value))
      throw new ValidationError(`Invalid statusvalue: ${value}`);

    return new BusinessStatus(value as BusinessStatusT);
  }

  public static fromPrimitives(
    value: BusinessStatusPrimitiveT,
  ): BusinessStatus {
    if (!(value in BusinessStatusTReverseMap))
      throw new ValidationError(`Invalid value: ${value}`);

    return new BusinessStatus(BusinessStatusTReverseMap[value]);
  }

  public toPrimitives(): BusinessStatusPrimitiveT {
    return BusinessStatusTMap[this.value];
  }
}
