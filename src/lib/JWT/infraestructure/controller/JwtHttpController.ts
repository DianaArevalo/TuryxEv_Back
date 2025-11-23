import { ApiResponse } from "~/lib/Shared/Infraestructure/ApiResponse";
import { express as ex } from "../../../Shared/Infraestructure/External";
import { signTokenHandler } from "../composition/jwt-composition";

export class JwtHttpController {
  static async JwtSign(req: ex.Request, res: ex.Response) {
    try {
      const { userId, payload } = req.body;

      const wrong: ApiResponse<any[]> = {
        success: false,
        title: "jwt/sign",
        message: "userId is required",
        body: userId,
      };

      if (!userId) return res.status(400).json(wrong);

      const jwtEntity = await signTokenHandler.handler(userId, payload?? {});
      const {accessToken, refreshToken, expiration} = jwtEntity.toPrimitives();

      res.cookie("accessToken", accessToken,
        {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        });

        res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      const response: ApiResponse<any> = {
        success: true,
        title: "jwt/sign",
        message: "jwt in sign",
        body: {
          accessToken,
          refreshToken,
          expiration
        },
      };

      return res
      .status(200)
      .json(response);

    } catch (err: any) {

      console.error("SignToken error:", err);

      return res
      .status(500)
      .json({ error: err.message || "Internal error" });
    }
  }

  static async JwtRefresh(req: ex.Request, res: ex.Response) {
    try {
        const refreshTokensign = req.cookies?.refreshToken;
        const {userId, payload } = req.body;

        const wrong: ApiResponse<any[]> = {
        success: false,
        title: "jwt/sign",
        message: "userId is required",
        body: userId,
      };

      if(!refreshTokensign) return res.status(401).json(wrong);

      const jwtEntity = await refreshTokensign.handler(refreshTokensign, userId, payload ?? {} );
      const {accessToken, refreshToken: newRefresh, expiration} = jwtEntity.toPrimitives();

      //Set cookies again
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 15 *60 * 1000,
      });

      res.cookie("refreshToken", newRefresh, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      const response: ApiResponse<any> = {
        success: true,
        title: "jwt/refresh",
        message: "tokens refreshed",
        body: {
          accessToken,
          newRefresh,
          expiration
        },
      };

      return res
      .status(200)
      .json(response);


        
    } catch (err: any) {

       console.error("RefreshToken error:", err);

        return res
      .status(500)
      .json({ error: err.message || "Internal error" });
    }
  }

  static async JwtRevoke(req: ex.Request, res: ex.Response) {
    
  }
}
