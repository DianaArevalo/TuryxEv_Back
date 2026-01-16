export interface RefreshTokenRecord {
  userId: string;
  tokenId: string;
  tokenHash: string;
  revoked: boolean;
  replacedByToken?: string;
  expiresAt: Date;
}
