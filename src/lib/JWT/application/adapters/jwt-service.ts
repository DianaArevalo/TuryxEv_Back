import { ForSignToken, ForVerifyToken } from "../../domain/ports/driven";
import { JwtEntity } from "../../domain/entities/JWT/JwtEntity";

export class JwtServiceAdapter {
  constructor(
    private readonly signPort: ForSignToken,
    private readonly verifyPort: ForVerifyToken
  ) {}

  async signToken(payload: object): Promise<JwtEntity> {
    return this.signPort.sign(payload);
  }

  async verifyToken(token: string): Promise<object> {
    return this.verifyPort.verify(token);
  }
}
