export interface JwtControllerPort {
  sign(userId: string, payload?: any): Promise<any>;
  refresh(oldRefreshToken: string, userId: string, payload?: any): Promise<any>;
  revoke(refreshToken: string, userId: string): Promise<void>;
}
