import { Hasher } from "../../../../../lib/Shared/Infraestructure/Hasher";
import { JwtEntity } from "../../../domain/entities/JWT/JwtEntity";
import { RefreshTokenRepository } from "../../../infraestructure/repositories/RefreshTokenRepository";

import { ValidationError } from "../../../../../lib/Shared/domain";
import { nanoid } from "nanoid";
import { JwtApplicationPort } from "../../adapters/JwtApplicationPort";

const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000

export class SignTokenHandler {
  constructor(
    private readonly jwtService: JwtApplicationPort,
    private readonly tokenRepository: RefreshTokenRepository
  ) {}

  async handler(userId: string, payload: object = {}): Promise<JwtEntity> {

    if (!userId) throw new ValidationError("UserId required");

    const tokenId = nanoid();

    const jwtEntity = await this.jwtService.signToken({
      ...payload,
      sub: userId,
      tid: tokenId,
    });

    const refreshToken = jwtEntity.toPrimitives().refreshToken;
    const refreshHash = await Hasher.hash(refreshToken);  
    
    const nowUtc = Date.now(); 
    const expiresAt = new Date(nowUtc + SEVEN_DAYS_IN_MS);
     // 7 días

    await this.tokenRepository.saveRefreshToken(
      userId,
      tokenId,
      refreshHash,
      expiresAt
    );
    return jwtEntity;
  }
}
