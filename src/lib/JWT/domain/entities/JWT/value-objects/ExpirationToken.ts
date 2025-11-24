import { ValidationError } from "../../../../../../lib/Shared/domain";

export class TokenExpiration {
  private readonly value: Date;

  constructor(value: Date) {
    this.value = value;
  }

  static create(value: string | number | Date): TokenExpiration {
    const expirationDate = new Date(value);

    if (isNaN(expirationDate.getTime())) {
      throw new ValidationError("Invalid expiration date");
    }

    const now = new Date();
    if (expirationDate <= now) {
      throw new ValidationError("Token expiration must be a future date");
    }

    return new TokenExpiration(expirationDate);
  }

  getValue(): Date {
    return this.value;
  }

  /**
   * Verifica si el token ya expiró en base a la fecha actual
   */
  isExpired(): boolean {
    return new Date() >= this.value;
  }

  /**
   * Devuelve el timestamp (útil si lo guardas como número en BD)
   */
  toTimestamp(): number {
    return this.value.getTime();
  }
}
