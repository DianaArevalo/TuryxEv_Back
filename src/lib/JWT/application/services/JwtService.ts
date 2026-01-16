import { JwtControllerPort } from "../../domain/ports/driver/JwtControllerPort";
import { RefreshTokenHandler } from "../handlers/refresh/refresh-token-handler";
import { RevokeTokenHandler } from "../handlers/revoke/revoke-token-handler";
import { SignTokenHandler } from "../handlers/sign/sign-token-handler";

export class JwtService implements JwtControllerPort {
  constructor(
    private readonly signHandler: SignTokenHandler,
    private readonly refreshHandler: RefreshTokenHandler,
    private readonly revokeHandler: RevokeTokenHandler,
  ) {}

  sign(userId: string, payload = {}) {
    return this.signHandler.handler(userId, payload);
  }

  refresh(oldRefreshToken: string, userId: string, payload = {}) {
    return this.refreshHandler.handler(oldRefreshToken, userId, payload);
  }

  revoke(refreshToken: string, userId: string) {
    return this.revokeHandler.handler(refreshToken, userId);
  }
}