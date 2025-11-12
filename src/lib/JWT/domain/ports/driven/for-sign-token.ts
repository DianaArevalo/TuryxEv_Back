import { JwtEntity } from "../../entities/JWT/JwtEntity";

/**
 * Puerto para la firma de tokens JWT
 * (Implementado por JwtAdapter)
 */
export interface ForSignToken {
  /**
   * Firma un nuevo par de tokens (access y refresh)
   * @param payload Datos a incluir en el token (por ejemplo, id del usuario, rol, proveedor)
   * @param expiresIn Duración en segundos del token de acceso
   */
  sign(payload: object, expiresIn?: number): Promise<JwtEntity>;
}
