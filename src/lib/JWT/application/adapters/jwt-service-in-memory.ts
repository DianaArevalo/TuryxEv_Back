import { JwtEntity } from "../../domain/entities/JWT/JwtEntity";

export class JwtServiceInMemory {
  private tokens: Record<string, any> = {};

  async signToken(payload: any): Promise<JwtEntity> {
    // Generamos un refresh token simulado
    const refreshToken = `refresh.${payload.sub}.${payload.tid}`;
    const jwt = JwtEntity.fromPrimitives({
      accessToken: "aaa.bbb.ccc",
      refreshToken,
      expiration: Date.now() + 3600_000, // 1 hora
    });

    // Guardamos el payload asociado al refresh token
    this.tokens[refreshToken] = { ...payload };
    return jwt;
  }

  async verifyToken(token: string): Promise<any> {
    const payload = this.tokens[token];
    if (!payload) throw new Error("Invalid token");
    return payload;
  }

  async revokeToken(token: string): Promise<void> {
    if (this.tokens[token]) {
      this.tokens[token].revoked = true;
    }
  }
  }
