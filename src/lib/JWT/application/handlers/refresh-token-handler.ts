import { Hasher } from "~/lib/Shared/Infraestructure/Hasher";
import { RefreshTokenRepository } from "../../infraestructure/repositories/RefreshTokenRepository";
import { JwtServiceAdapter } from "../adapters/JwtServiceAdapter";
import { JwtEntity } from "../../domain/entities/JWT/JwtEntity";
import { randomUUID } from "crypto";

export class RefreshTokenHandler {
  constructor(
    private readonly jwtService: JwtServiceAdapter,
    private readonly tokenRepository: RefreshTokenRepository
  ) {}

  async handler(userId: string, payload: object): Promise<JwtEntity> {
    const tokenId = randomUUID();

  const jwtEntity = await this.jwtService.signToken({
    ...payload,
    sub: userId,
    tid: tokenId,
  });

  const refreshToken = jwtEntity.toPrimitives().refreshToken;
  const refreshHash = await Hasher.hash(refreshToken);

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await this.tokenRepository.saveRefreshToken(userId, tokenId, refreshHash, expiresAt);
  return jwtEntity;
  }
}
