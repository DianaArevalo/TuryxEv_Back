import { RefreshTokenHandler, RevokeTokenHandler, SignTokenHandler } from "../../application";
import { JwtServiceAdapter } from "../../application/adapters/jwt-service";
import { JwtAdapter } from "../adapters/JwtAdapter";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";

const jwtAdapter = new JwtAdapter();
const refreshRepo = new RefreshTokenRepository();
const jwtService = new JwtServiceAdapter(jwtAdapter, jwtAdapter); // sign + verify

export const signTokenHandler = new SignTokenHandler(jwtService, refreshRepo);
export const refreshTokenHandler = new RefreshTokenHandler(jwtService, refreshRepo);
export const revokeTokenHandler = new RevokeTokenHandler(jwtService, refreshRepo);


