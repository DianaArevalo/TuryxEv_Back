import { JwtEntity, JwtPayload } from "../../entities";

export interface JwtControllerPort {
  sign(
    userId: string, 
    payload?: JwtPayload
  ): Promise<JwtEntity>;

  refresh(
    oldRefreshToken: string, 
    userId: string, 
    payload?: JwtPayload
  ): Promise<JwtEntity>;

  revoke(
    refreshToken: string, 
    userId: string
  ): Promise<void>;
}
