import { ValidationError } from '../../../../../Shared/domain/exeptions';

export type UserPlanT = 'FREE' | 'BASIC' | 'PREMIUM';

const UserPlanTMap: Record<UserPlanT, 0 | 1 | 2> = {
  FREE: 0,
  BASIC: 1,
  PREMIUM: 2,
};

const UserPlanTReverseMap: Record<0 | 1 | 2, UserPlanT> = {
  0: 'FREE',
  1: 'BASIC',
  2: 'PREMIUM',
};

/**
 * Value Object: UserPlan
 * Representa el tipo de plan del usuario, garantizando su validez.
 * Sin lógica de negocio ni decisiones — solo validación de consistencia.
 */
export class UserPlan {
  readonly value: UserPlanT;

  constructor(value: UserPlanT) {
    this.value = value;
  }

  /**
   * Crea una instancia de UserPlan desde un string validado.
   */
  static create(value: string): UserPlan {
    if (!['FREE', 'BASIC', 'PREMIUM'].includes(value)) {
      throw new ValidationError(`Invalid value: ${value}`);
    }
    return new UserPlan(value as UserPlanT);
  }

  /**
   * Crea una instancia desde la representación numérica (p. ej. base de datos).
   */
  static fromPrimitives(value: 0 | 1 | 2): UserPlan {
    const mapped = UserPlanTReverseMap[value];
    if (!mapped) throw new ValidationError(`Invalid value: ${value}`);
    return new UserPlan(mapped);
  }

  /**
   * Retorna la representación primitiva (para persistencia).
   */
  toPrimitives(): 0 | 1 | 2 {
    return UserPlanTMap[this.value];
  }

  /**
   * Crea un plan por defecto (usualmente "FREE").
   * Esta decisión de negocio (por defecto "FREE") la controla la capa de aplicación.
   * Aquí solo se provee como método auxiliar puro.
   */
  static default(): UserPlan {
    return new UserPlan('FREE');
  }
}
