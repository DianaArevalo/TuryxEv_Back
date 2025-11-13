import { ValidationError } from "~/lib/Shared/domain";
import { RefreshTokenRepository } from "../../infraestructure/repositories/RefreshTokenRepository";
import { JwtServiceAdapter } from "../adapters/JwtServiceAdapter";

export class RevokeTokenHandler {
  constructor(
    private readonly jwtService: JwtServiceAdapter,
    private readonly tokenRepository: RefreshTokenRepository
  ) {}

  async handler(refreshToken: string): Promise<void> {
    const payload = await this.jwtService.verifyToken(refreshToken);
    const tokenId = payload["tid"];

    const token = await this.tokenRepository.findRefreshTokenById(tokenId);
  if (!token) throw new ValidationError("Token not found");
  

    await this.tokenRepository.revokeRefreshToken(tokenId);
  }
}
