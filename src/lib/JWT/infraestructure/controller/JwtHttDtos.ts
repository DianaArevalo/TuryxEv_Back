export interface JwtSignRequest {
  userId: string;
}

export interface JwtRefreshRequest {
  userId: string;
}

export interface JwtSignResponse {
  authenticated: true;
  expiration: number;
}

export interface JwtRefreshResponse {
  refreshed: true;
  expiration: number;
}

export interface JwtRevokeResponse {
  revoked: true;
}
