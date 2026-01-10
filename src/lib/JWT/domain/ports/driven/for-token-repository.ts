// domain/ports/driven/for-token-repository.ts

import { RefreshTokenRecord } from "../../entities/JWT/RefreshTokenRecord";
import { RefreshToken } from "../../entities/JWT/value-objects";


export interface ForTokenRepository {
  saveRefreshToken(
    userId: string,
    tokenId: string,
    tokenHash: string,
    expiresAt: Date
  ): Promise<void>;

  findRefreshTokenById(tokenId: string): Promise<RefreshTokenRecord | null>;

  revokeRefreshToken(tokenId: string): Promise<void>;

  replaceRefreshToken(
    oldTokenId: string,
    newTokenId: string,
    newHash: string,
    newExpiresAt: Date
  ): Promise<void>;

  purgeExpiredTokens(): Promise<void>;
}
