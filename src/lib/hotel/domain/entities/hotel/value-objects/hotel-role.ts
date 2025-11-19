import { ValidationError } from '~/lib/Shared/domain';

export type HotelRoleT = 'HOTEL' | 'STAFF';
export type HotelRolePrimitiveT = 0 | 1;
export const HotelRolePrimitiveArray = [0, 1];

const HotelRoleTMap: Record<HotelRoleT, HotelRolePrimitiveT> = {
  HOTEL: 0,
  STAFF: 1,
};

const HotelRoleTReverseMap: Record<HotelRolePrimitiveT, HotelRoleT> = {
  0: 'HOTEL',
  1: 'STAFF',
};

export class HotelRole {
  constructor(readonly value: HotelRoleT) {}

  static create(value: string): HotelRole {
    if (!['HOTEL', 'STAFF'].includes(value))
      throw new ValidationError(`Invalid value: ${value}`);

    return new HotelRole(value as HotelRoleT);
  }

  static fromPrimitives(value: HotelRolePrimitiveT): HotelRole {
    const mapped = HotelRoleTReverseMap[value];
    if (!mapped) throw new ValidationError(`Invalid role: ${value}`);

    return new HotelRole(mapped);
  }

  toPrimitives(): HotelRolePrimitiveT {
    const numberValue = HotelRoleTMap[this.value];
    if (numberValue === undefined)
      throw new ValidationError(`Invalid value: ${this.value}`);

    return numberValue;
  }
}
