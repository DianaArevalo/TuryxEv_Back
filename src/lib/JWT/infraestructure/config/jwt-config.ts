import { dotenv } from "../../../Shared/Infraestructure/External";

dotenv.config();

export const jwtConfig = {
  secret: process.env.JWT_SECRET || "default_secret_key",
  accessTokenExpiresIn: "15m",
  refreshTokenExpiresIn: "7d",
  algorithm: "HS256",
  accessTokenTTL: 900, // 15 minutos
  refreshTokenTTL: 7 * 24 * 60 * 60, // 7 días
};
