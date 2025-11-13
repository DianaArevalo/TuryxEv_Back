import { ValidationError } from "../../../../../Shared/domain/exeptions";

export type BusinessRoleT = 'BUSINESS' | 'STAFF';
export type BusinessRolePrimitiveT = 0 | 1;
export const BusinessRolePrimitiveArray = [0, 1];

const BusinessRoleTMap: Record<BusinessRoleT, BusinessRolePrimitiveT> = {
  BUSINESS: 0,
  STAFF: 1,
};

const BusinessRoleTReverseMap: Record<BusinessRolePrimitiveT, BusinessRoleT> = {
  0: 'BUSINESS',
  1: 'STAFF',
};

export class BusinessRole {
  constructor(readonly value: BusinessRoleT) {}

  static create(value: string) {
    if (!Object.values(BusinessRoleTReverseMap).includes(value as any))
      throw new ValidationError(`Invalid value: ${value}`);

    return new BusinessRole(value as BusinessRoleT);
  }

  static fromPrimitives(value: BusinessRolePrimitiveT) {
    const mapped = BusinessRoleTReverseMap[value];
    if (!mapped) throw new ValidationError(`Invalid value: ${value}`);

    return new BusinessRole(mapped);
  }

  toPrimitives(): BusinessRolePrimitiveT {
    const numberValue = BusinessRoleTMap[this.value];
    if (numberValue === undefined)
      throw new ValidationError(`Invalid value: ${this.value}`);

    return numberValue;
  }
}
