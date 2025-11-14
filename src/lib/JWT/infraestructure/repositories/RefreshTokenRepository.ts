import { ForTokenRepository } from "../../domain/ports/driven/for-token-repository";
import { RefreshTokenModel } from "../models/refresh-token-model";

export class RefreshTokenRepository implements ForTokenRepository {
  async saveRefreshToken(
    userId: string,
    tokenId: string,
    tokenHash: string,
    expiresAt: Date
  ): Promise<void> {
    await RefreshTokenModel.create({ userId, tokenId, tokenHash, expiresAt });
  }

  async findRefreshTokenById(tokenId: string) {
    return await RefreshTokenModel.findOne({ tokenId });
  }

  async revokeRefreshToken(tokenId: string): Promise<void> {
    await RefreshTokenModel.updateOne({ tokenId }, { revoked: true });
  }

  async replaceRefreshToken(
    oldTokenId: string,
    newTokenId: string,
    newHash: string,
    newExpiresAt: Date
  ): Promise<void> {
    const oldToken = await RefreshTokenModel.findOne({ tokenId: oldTokenId });
    if (!oldToken) throw new Error("Old refresh token not found");

    oldToken.revoked = true;
    oldToken.replacedByToken = newTokenId;
    await oldToken.save();

    await this.saveRefreshToken(
      oldToken.userId,
      newTokenId,
      newHash,
      newExpiresAt
    );
  }

  async purgeExpiredTokens(): Promise<void> {
    await RefreshTokenModel.deleteMany({ expiresAt: { $lte: new Date() } });
  }
}
