import { ValidationError } from "../../../../lib/Shared/domain";
import { RefreshTokenRepository } from "../../infraestructure/repositories/RefreshTokenRepository";
import { JwtServiceAdapter } from "../adapters/jwt-service";

export class RevokeTokenHandler {
  constructor(
    private readonly jwtService: JwtServiceAdapter,
    private readonly tokenRepository: RefreshTokenRepository
  ) {}

  async handler(refreshToken: string, userId: string): Promise<void> {
    if (!refreshToken) throw new ValidationError("Token required");

    const payload = await this.jwtService.verifyToken(refreshToken);
    const tokenId = payload.tid;

    if (payload.sub !== userId) {
      throw new ValidationError("Token does not belong to the user");
    }

    const tokenRecord = await this.tokenRepository.findRefreshTokenById(
      tokenId
    );
    if (!tokenRecord) throw new ValidationError("Token not found");

    await this.tokenRepository.revokeRefreshToken(tokenId);
  }
}
