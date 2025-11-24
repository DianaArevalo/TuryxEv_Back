import { Hasher } from "../../../../lib/Shared/Infraestructure/Hasher";
import { RefreshTokenRepository } from "../../infraestructure/repositories/RefreshTokenRepository";
import { JwtServiceAdapter } from "../adapters/jwt-service";
import { JwtEntity } from "../../domain/entities/JWT/JwtEntity";
import { ValidationError } from "~/lib/Shared/domain";
import { nanoid } from "nanoid";

export class RefreshTokenHandler {
  constructor(
    private readonly jwtService: JwtServiceAdapter,
    private readonly tokenRepository: RefreshTokenRepository
  ) {}

  async handler(
    oldRefreshToken: string,
    userId: string,
    payload: object
  ): Promise<JwtEntity> {
    if (!oldRefreshToken) throw new ValidationError("Refresh token required");

    const decoded = await this.jwtService.verifyToken(oldRefreshToken);
    const oldTokenId = decoded.tid;

    if (decoded.sub !== userId) {
      throw new ValidationError("Refresh token does not belong to the user");
    }

    const oldRecord = await this.tokenRepository.findRefreshTokenById(
      oldTokenId
    );
    if (!oldRecord || oldRecord.revoked)
      throw new ValidationError("Invalid or revoked refresh token");

    const isValid = await Hasher.verify(oldRefreshToken, oldRecord.tokenHash);
    if (!isValid) throw new ValidationError("Token verification failed");

    const newTokenId = nanoid();

    const jwtEntity = await this.jwtService.signToken({
      ...payload,
      sub: userId,
      tid: newTokenId,
    });

    const newRefreshToken = jwtEntity.toPrimitives().refreshToken;
    const newHash = await Hasher.hash(newRefreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.tokenRepository.saveRefreshToken(
      oldTokenId,
      newTokenId,
      newHash,
      expiresAt
    );

    return jwtEntity;
  }
}
