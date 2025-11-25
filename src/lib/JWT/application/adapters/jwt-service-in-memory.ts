import { JwtEntity } from "../../domain/entities/JWT/JwtEntity";

export class JwtServiceInMemory {
  async signToken(payload: any): Promise<JwtEntity> {
    return JwtEntity.fromPrimitives({
      accessToken: "aaa.bbb.ccc",     // <-- JWT válido falso
      refreshToken: "ddd.eee.fff",   // <-- JWT válido falso
      expiration: Date.now() + 3600_000, // 1 hora
    });
  }
}
