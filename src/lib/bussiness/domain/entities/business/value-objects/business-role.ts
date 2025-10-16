import { ValidationError } from "~/lib/Shared/domain/exeptions";

export type BusinessRoleT = "BUSINESS" | "STAFF";

const BusinessRoleTMap: Record<BusinessRoleT, 0 | 1> = {
  BUSINESS: 0,
  STAFF: 1,
};

const BusinessRoleTReverseMap: Record<0 | 1, BusinessRoleT> = {
  0: "BUSINESS",
  1: "STAFF",
};

export class BusinessRole {
  constructor(readonly value: BusinessRoleT) {}

  static create(value: string) {
    if (!Object.values(BusinessRoleTReverseMap).includes(value as any))
      throw new ValidationError(`Invalid value: ${value}`);

    return new BusinessRole(value as BusinessRoleT);
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
