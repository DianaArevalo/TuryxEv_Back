import {
  RefreshTokenHandler,
  RevokeTokenHandler,
  SignTokenHandler,
} from "../../application";
import { JwtServiceAdapter } from "../../application/adapters/jwt-service";
import { JwtService } from "../../application/services/JwtService";
import { JwtAdapter } from "../adapters/JwtAdapter";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";

const jwtComposition = () => {
  const jwtAdapter = new JwtAdapter();
  const refreshTokenRepository = new RefreshTokenRepository();

  const jwtService = new JwtServiceAdapter(jwtAdapter, jwtAdapter);

  const signTokenHandler = new SignTokenHandler(jwtService, refreshTokenRepository);
  const refreshTokenHandler = new RefreshTokenHandler(jwtService, refreshTokenRepository);
  const revokeTokenHandler = new RevokeTokenHandler(jwtService, refreshTokenRepository);

  return {
    signTokenHandler,
    refreshTokenHandler,
    revokeTokenHandler,
  };
};

// 🚀 Crear handlers
const handlers = jwtComposition();

// 🚀 Exportar handlers individuales 
export const signTokenHandler = handlers.signTokenHandler;
export const refreshTokenHandler = handlers.refreshTokenHandler;
export const revokeTokenHandler = handlers.revokeTokenHandler;

// 🚀 Exportar el aggregate service también
export const jwtService = new JwtService(
  handlers.signTokenHandler,
  handlers.refreshTokenHandler,
  handlers.revokeTokenHandler
);
