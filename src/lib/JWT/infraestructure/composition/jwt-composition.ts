import { JwtAdapter } from "../adapters/JwtAdapter";
import { JwtRepository } from "../repositories/jwt-repository";

const jwtAdapter = new JwtAdapter();
const jwtRepository = new JwtRepository();

export const JwtModule = {
  sign: jwtAdapter.sign.bind(jwtAdapter),
  verify: jwtAdapter.verify.bind(jwtAdapter),
  repository: jwtRepository,
};
