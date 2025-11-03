import { ValidationError } from "../../../../../Shared/domain/exeptions";

export type BusinessRoleT = "USER"; // Solo un rol por ahora

const BusinessRoleTMap: Record<BusinessRoleT, 0> = {
  USER: 0,
};

const BusinessRoleTReverseMap: Record<0, BusinessRoleT> = {
  0: "USER",
};

export class BusinessRole {
  constructor(readonly value: BusinessRoleT) {}

  static create(value: string) {
    if (!Object.values(BusinessRoleTReverseMap).includes(value as any))
      throw new ValidationError(`Invalid value: ${value}`);

    return new BusinessRole(value as BusinessRoleT);
  }

  static fromPrimitives(value: 0) {
    const mapped = BusinessRoleTReverseMap[value];
    if (!mapped) throw new ValidationError(`Invalid value: ${value}`);

    return new BusinessRole(mapped);
  }

  toPrimitives(): 0 {
    const numberValue = BusinessRoleTMap[this.value];
    if (numberValue === undefined)
      throw new ValidationError(`Invalid value: ${this.value}`);

    return numberValue;
  }
}
