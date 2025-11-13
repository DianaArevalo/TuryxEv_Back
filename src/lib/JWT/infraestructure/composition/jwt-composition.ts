import { JwtAdapter } from "../adapters/JwtAdapter";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";

const jwtAdapter = new JwtAdapter();
const jwtRepository = new RefreshTokenRepository();

export const JwtModule = {
  sign: jwtAdapter.sign.bind(jwtAdapter),
  verify: jwtAdapter.verify.bind(jwtAdapter),
  repository: jwtRepository,
};
