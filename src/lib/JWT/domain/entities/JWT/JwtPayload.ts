export interface JwtPayload {
  sub: string;  // ID del usuario
  tid: string;  // Token ID (UUID usado para rotación)
  iat?: number; // Issued At
  exp?: number; // Expiration timestamp
}
