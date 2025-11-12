/**
 * Puerto para la verificación y decodificación de tokens JWT
 * (Implementado por JwtAdapter)
 */
export interface ForVerifyToken {
  /**
   * Verifica la validez de un token y devuelve el payload decodificado.
   * @param token Token JWT recibido
   * @throws Error si el token es inválido, caducado o alterado
   */
  verify(token: string): Promise<object>;
}
