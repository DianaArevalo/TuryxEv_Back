import { JwtCustomPayload, JwtEntity, JwtPayload } from "../../domain/entities";

export interface JwtApplicationPort {
  signToken(payload: JwtCustomPayload): Promise<JwtEntity>;
  verifyToken(token: string): Promise<JwtPayload>;
}
