
import { Hasher } from "~/lib/Shared/Infraestructure/Hasher";
import { JwtEntity } from "../../domain/entities/JWT/JwtEntity";
import { RefreshTokenRepository } from "../../infraestructure/repositories/RefreshTokenRepository";
import { JwtServiceAdapter } from "../adapters/JwtServiceAdapter";

export class SignTokenHandler {
  constructor(
    private readonly jwtService: JwtServiceAdapter,
    private readonly tokenRepository: RefreshTokenRepository
  ) {}

  async handler(userId: string, payload: object): Promise<JwtEntity> {
    const jwtEntity = await this.jwtService.signToken(payload);
    const refreshToken = jwtEntity.toPrimitives().refreshToken;
    const refreshHash = await Hasher.hash(refreshToken);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días

    await this.tokenRepository.saveRefreshToken(userId, "TODO:tokenId", refreshHash, expiresAt);
    return jwtEntity;
  }
}
