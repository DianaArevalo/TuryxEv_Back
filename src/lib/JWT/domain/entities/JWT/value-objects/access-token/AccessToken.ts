import { ValidationError } from "../../../../../../../lib/Shared/domain";

export class AccessToken {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  static create(value: string): AccessToken {
    if (!value || value.trim() === "") {
      throw new ValidationError("Invalid access token");
    }

    // Validación opcional: formato de JWT
    const jwtParts = value.split(".");
    if (jwtParts.length !== 3) {
      throw new ValidationError("Malformed JWT token");
    }

    return new AccessToken(value);
  }

  getValue(): string {
    return this.value;
  }
}
