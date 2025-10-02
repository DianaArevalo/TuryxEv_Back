import { ValidationError } from "~/lib/Shared/domain/exeptions";

export type BusinessRoleT = "BUSINESS" | "ADMINBUSINESS";

const BusinessRoleTMap: Record<BusinessRoleT, 0 | 1> = {
  BUSINESS: 0,
  ADMINBUSINESS: 1,
};

const BusinessRoleTReverseMap: Record<0 | 1, BusinessRoleT> = {
  0: "BUSINESS",
  1: "ADMINBUSINESS",
};

export class BusinessRole {
  constructor(readonly value: string) {}

  static create(value: BusinessRoleT) {
    if (!Object.values(BusinessRoleTMap).includes(value as any))
      throw new ValidationError(`Invalid value: ${value}`);

    return new BusinessRole(value);
  }

  static fromPrimitives(value: 0 | 1) {
    const mapped = BusinessRoleTReverseMap[value];
    if (!mapped) throw new ValidationError(`Invalid value: ${value}`);

    return new BusinessRole(mapped);
  }

  toPrimitives(): 0 | 1 {
    const numberValue = BusinessRoleTMap[this.value as BusinessRoleT];
    if (numberValue === undefined)
      throw new ValidationError(`Invalid value: ${this.value}`);

    return numberValue;
  }
}
