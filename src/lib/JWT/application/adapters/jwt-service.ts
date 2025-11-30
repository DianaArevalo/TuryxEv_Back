import { ForSignToken, ForVerifyToken } from "../../domain/ports/driven";
import { JwtEntity } from "../../domain/entities/JWT/JwtEntity";
import { JwtPayload } from "../../domain/entities/JWT/JwtPayload";
import { JwtCustomPayload } from "../../domain/entities";
import { SignTokenHandler } from "../handlers/sign/sign-token-handler";
import { RefreshTokenHandler } from "../handlers/refresh/refresh-token-handler";
import { RevokeTokenHandler } from "../handlers/revoke/revoke-token-handler";

export class JwtServiceAdapter {
  constructor(
    private readonly signPort: ForSignToken,
    private readonly verifyPort: ForVerifyToken    
  ) {}

  async signToken(payload: JwtCustomPayload): Promise<JwtEntity> {
    return this.signPort.sign(payload);
  }

  async verifyToken(token: string): Promise<JwtPayload> {
    const decoded = await this.verifyPort.verify(token);

    // ✅ Verificación runtime de estructura (evita errores de casting ciego)
    if (
      typeof decoded !== "object" ||
      !decoded ||
      !("sub" in decoded) ||
      !("tid" in decoded)
    ) {
      throw new Error("Invalid token payload structure");
    }

    // 🧠 Ahora TypeScript sabe que `decoded` es JwtPayload
    return decoded as JwtPayload;
  }
}
