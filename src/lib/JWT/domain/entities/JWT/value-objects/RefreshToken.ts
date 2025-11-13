import { ValidationError } from "~/lib/Shared/domain";

export class RefreshToken {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): RefreshToken {
    if (!value || value.trim() === "") {
      throw new ValidationError("Invalid refresh token");
    }

    // Validación opcional del formato JWT (3 partes separadas por ".")
    const jwtParts = value.split(".");
    if (jwtParts.length !== 3) {
      throw new ValidationError("Malformed refresh token");
    }

    // ✅ Retorna la instancia
    return new RefreshToken(value);
  }

  getValue(): string {
    return this.value;
  }
}
