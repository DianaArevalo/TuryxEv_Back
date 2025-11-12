import { jwt } from "../../../../lib/Shared/Infraestructure/External";
import { ForSignToken, ForVerifyToken } from "../../domain/ports/driven";
import { JwtEntity } from "../../domain/entities/JWT/JwtEntity";
import {
  AccessToken,
  RefreshToken,
  TokenExpiration,
} from "../../domain/entities/JWT/value-objects";

export class JwtAdapter implements ForSignToken, ForVerifyToken {
  private readonly secret = process.env.JWT_SECRET!;

  async sign(payload: object, expiresIn = 900): Promise<JwtEntity> {
    const accessToken = jwt.sign(payload, this.secret, { expiresIn });
    const refreshToken = jwt.sign(payload, this.secret, { expiresIn: "7d" });

    return new JwtEntity(
      AccessToken.create(accessToken),
      RefreshToken.create(refreshToken),
      TokenExpiration.create(Date.now() + expiresIn * 1000)
    );
  }

  async verify(token: string): Promise<object> {
    return jwt.verify(token, this.secret) as object;
  }
}
