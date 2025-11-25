import { ForTokenRepository } from "../../domain/ports/driven/for-token-repository";

interface InMemoryToken {
  userId: string;
  tokenId: string;
  tokenHash: string;
  expiresAt: Date;
  revoked: boolean;
  replacedByToken?: string;
}

export class RefreshTokenRepositoryInMemory implements ForTokenRepository {
  private tokens: InMemoryToken[] = [];

  async saveRefreshToken(
    userId: string,
    tokenId: string,
    tokenHash: string,
    expiresAt: Date
  ): Promise<void> {
    this.tokens.push({
      userId,
      tokenId,
      tokenHash,
      expiresAt,
      revoked: false,
    });
  }

  async findRefreshTokenById(tokenId: string) {
    return this.tokens.find((t) => t.tokenId === tokenId) || null;
  }

  async revokeRefreshToken(tokenId: string): Promise<void> {
    const token = this.tokens.find((t) => t.tokenId === tokenId);
    if (token) token.revoked = true;
  }

  async replaceRefreshToken(
    oldTokenId: string,
    newTokenId: string,
    newHash: string,
    newExpiresAt: Date
  ): Promise<void> {
    const oldToken = this.tokens.find((t) => t.tokenId === oldTokenId);

    if (!oldToken) throw new Error("Old refresh token not found");

    oldToken.revoked = true;
    oldToken.replacedByToken = newTokenId;

    this.tokens.push({
      userId: oldToken.userId,
      tokenId: newTokenId,
      tokenHash: newHash,
      expiresAt: newExpiresAt,
      revoked: false,
    });
  }

  async purgeExpiredTokens(): Promise<void> {
    const now = new Date();
    this.tokens = this.tokens.filter((t) => t.expiresAt > now);
  }

  // Método útil para pruebas
  getAll() {
    return this.tokens;
  }
}
