import { JwtEntity, JwtPayload } from "../../domain/entities";

export interface JwtApplicationPort {
  signToken(payload: JwtPayload): Promise<JwtEntity>;
  verifyToken(token: string): Promise<JwtPayload>;
}
