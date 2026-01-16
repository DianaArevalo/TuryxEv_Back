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

  constructor() {
    if (!this.secret) {
      throw new Error("JWT_SECRET is not configured");
    }
  }

async sign(payload: object, expiresIn = 900): Promise<JwtEntity> {
  const accessToken = new AccessToken(
    jwt.sign(payload, this.secret, { expiresIn })
  );

  const refreshToken = new RefreshToken(
    jwt.sign(payload, this.secret, { expiresIn: "7d" })
  );

  // Convertimos segundos → fecha real
  const expirationDate = new Date(Date.now() + expiresIn * 1000);

  return new JwtEntity(accessToken, refreshToken, new TokenExpiration(expirationDate));
}


 verify(token: string): Promise<object> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, this.secret, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded as object);
    });
  });
}

}
