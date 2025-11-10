import { AccessToken, RefreshToken, TokenExpiration } from "./value-objects";


export interface JwtI {
  accessToken: string;
  refreshToken: string;
  expiration: number; // timestamp (en milisegundos)
}

/**
 * Entidad de dominio que representa un JWT válido en el sistema.
 * Encapsula los Value Objects para mantener coherencia y reglas de negocio.
 */
export class JwtEntity {
  constructor(
    readonly accessToken: AccessToken,
    readonly refreshToken: RefreshToken,
    readonly expiration: TokenExpiration
  ) {}

  /**
   * Devuelve la representación primitiva del token.
   * (Usado para responses HTTP o persistencia)
   */
  toPrimitives(): JwtI {
    return {
      accessToken: this.accessToken.getValue(),
      refreshToken: this.refreshToken.getValue(),
      expiration: this.expiration.toTimestamp(),
    };
  }

  /**
   * Verifica si el token ya expiró.
   */
  isExpired(): boolean {
    return this.expiration.isExpired();
  }

  /**
   * Crea una instancia de JwtEntity a partir de datos primitivos.
   * (Usado cuando traes datos desde la BD o una request)
   */
  static fromPrimitives(data: JwtI): JwtEntity {
    return new JwtEntity(
      AccessToken.create(data.accessToken),
      RefreshToken.create(data.refreshToken),
      TokenExpiration.create(data.expiration)
    );
  }
}
