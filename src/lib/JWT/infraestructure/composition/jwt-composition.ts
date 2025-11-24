import {
  RefreshTokenHandler,
  RevokeTokenHandler,
  SignTokenHandler,
} from "../../application";
import { JwtServiceAdapter } from "../../application/adapters/jwt-service";
import { JwtAdapter } from "../adapters/JwtAdapter";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";

const jwtComposition = () => {
  const jwtAdapter = new JwtAdapter();              // usa JWT_SECRET
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

export const { 
  signTokenHandler, 
  refreshTokenHandler, 
  revokeTokenHandler 
} = jwtComposition();
