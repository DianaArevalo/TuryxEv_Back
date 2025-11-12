import { ForTokenRepository } from "../../domain/ports/driven";
import { TokenModel } from "../models/token-model";

export class JwtRepository implements ForTokenRepository {
  async saveToken(userId: string, token: string, expiresAt: Date): Promise<void> {
    await TokenModel.create({ userId, token, expiresAt });
  }

  async findByToken(token: string) {
    return await TokenModel.findOne({ token });
  }

  async revokeToken(token: string) {
    await TokenModel.updateOne({ token }, { revoked: true });
  }
}
