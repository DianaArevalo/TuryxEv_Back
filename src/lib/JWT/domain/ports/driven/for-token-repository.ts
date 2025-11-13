/**
 * Puerto Driven: define las operaciones que cualquier adaptador de persistencia
 * (Mongo, Redis, SQL) debe implementar para manejar Refresh Tokens.
 */
export interface ForTokenRepository {
  /**
   * Guarda un nuevo refresh token asociado a un usuario.
   * El token debe llegar ya hasheado (nunca en texto plano).
   */
  saveRefreshToken(
    userId: string,
    tokenId: string, // UUID generado para identificar el token
    tokenHash: string,
    expiresAt: Date
  ): Promise<void>;

  /**
   * Busca un refresh token por su ID (tokenId).
   * Esto evita tener que buscar por el valor plano del token.
   */
  findRefreshTokenById(tokenId: string): Promise<{
    userId: string;
    tokenId: string;
    tokenHash: string;
    expiresAt: Date;
    revoked: boolean;
    replacedByToken?: string;
  } | null>;

  /**
   * Marca un refresh token como revocado (logout o rotación).
   */
  revokeRefreshToken(tokenId: string): Promise<void>;

  /**
   * Reemplaza un refresh token antiguo por uno nuevo (rotación).
   * Revoca el anterior y guarda el nuevo.
   */
  replaceRefreshToken(
    oldTokenId: string,
    newTokenId: string,
    newHash: string,
    newExpiresAt: Date
  ): Promise<void>;

  /**
   * (Opcional) Limpia tokens expirados o revocados si el motor no lo hace automáticamente.
   */
  purgeExpiredTokens?(): Promise<void>;
}
