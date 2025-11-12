export interface ForTokenRepository {
  saveToken(userId: string, token: string, expiresAt: Date): Promise<void>;
  findByToken(token: string): Promise<object | null>;
  revokeToken(token: string): Promise<void>;
}
