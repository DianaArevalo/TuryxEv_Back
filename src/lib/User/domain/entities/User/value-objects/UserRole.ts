import { ValidationError } from "../../../../../Shared/domain/exeptions";

export type UserRoleT = "USER"; // Solo un rol por ahora

const UserRoleTMap: Record<UserRoleT, 0> = {
  USER: 0,
};

const UserRoleTReverseMap: Record<0, UserRoleT> = {
  0: "USER",
};

export class UserRole {
  constructor(readonly value: UserRoleT) {}

  static create(value: string) {
    if (!Object.values(UserRoleTReverseMap).includes(value as any))
      throw new ValidationError(`Invalid value: ${value}`);

    return new UserRole(value as UserRoleT);
  }

  static fromPrimitives(value: 0) {
    const mapped = UserRoleTReverseMap[value];
    if (!mapped) throw new ValidationError(`Invalid value: ${value}`);

    return new UserRole(mapped);
  }

  toPrimitives(): 0 {
    const numberValue = UserRoleTMap[this.value];
    if (numberValue === undefined)
      throw new ValidationError(`Invalid value: ${this.value}`);

    return numberValue;
  }
}
