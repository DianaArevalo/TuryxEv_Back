import { ValidationError } from '~/lib/shared/domain';

export type UserRoleT = 'USER';
export type UserRolePrimitiveT = 0;
export const UserRolePrimitiveArray = [0];

const UserRoleTMap: Record<UserRoleT, UserRolePrimitiveT> = {
  USER: 0,
};

const UserRoleTReverseMap: Record<UserRolePrimitiveT, UserRoleT> = {
  0: 'USER',
};

export class UserRole {
  constructor(readonly value: UserRoleT) {}

  static create(value: string) {
    if (!['USER'].includes(value))
      throw new ValidationError(`Invalid value: ${value}`);

    return new UserRole(value as UserRoleT);
  }

  static fromPrimitives(value: UserRolePrimitiveT) {
    const mapped = UserRoleTReverseMap[value];
    if (!mapped) throw new ValidationError(`Invalid value: ${value}`);

    return new UserRole(mapped);
  }

  toPrimitives(): UserRolePrimitiveT {
    const numberValue = UserRoleTMap[this.value];
    if (numberValue === undefined)
      throw new ValidationError(`Invalid value: ${this.value}`);

    return numberValue;
  }
}
