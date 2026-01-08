import { JwtCustomPayload, JwtEntity } from "../../entities";

export interface JwtControllerPort {
  sign(
    userId: string, 
    payload?: JwtCustomPayload
  ): Promise<JwtEntity>;

  refresh(
    oldRefreshToken: string, 
    userId: string, 
    payload?: JwtCustomPayload
  ): Promise<JwtEntity>;

  revoke(
    refreshToken: string, 
    userId: string
  ): Promise<void>;
}
