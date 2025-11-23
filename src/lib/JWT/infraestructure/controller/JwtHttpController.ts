import { ApiResponse } from "~/lib/Shared/Infraestructure/ApiResponse";
import { express as ex } from "../../../Shared/Infraestructure/External";
import { refreshTokenHandler, revokeTokenHandler, signTokenHandler } from "../composition/jwt-composition";

export class JwtHttpController {
  async jwtSign(req: ex.Request, res: ex.Response) {
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
          maxAge: 15 * 60 * 1000,
        });

        res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,        
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      const response: ApiResponse<any> = {
        success: true,
        title: "jwt/sign",
        message: "jwt in sign",
        body: {
          authenticated: true,
          expiration,
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

  async jwtRefresh(req: ex.Request, res: ex.Response) {
    try {
        const oldRefreshToken = req.cookies?.refreshToken;
        const {userId, payload } = req.body;

        const wrong: ApiResponse<null> = {
        success: false,
        title: "jwt/refresh",
        message: "refresh token missing",
        body:  null,
      };

      if(!oldRefreshToken) return res.status(401).json(wrong);

      const jwtEntity = await refreshTokenHandler.handler(oldRefreshToken, userId, payload ?? {} );
      const {accessToken, refreshToken: newRefresh, expiration} = jwtEntity.toPrimitives();

      //Set cookies again
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,        
        maxAge: 15 *60 * 1000,
      });

      res.cookie("refreshToken", newRefresh, {
        httpOnly: true,
        secure: true,        
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      const response: ApiResponse<any> = {
        success: true,
        title: "jwt/refresh",
        message: "tokens refreshed",
        body: {
          refreshed: true,
          expiration,
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

  async jwtRevoke(req: ex.Request, res: ex.Response) {
    try{

      const refreshToken = req.cookies?.refreshToken;
      const {userId} = req.body;

       const wrong: ApiResponse<any[]> = {
        success: false,
        title: "jwt/revoked",
        message: "Refresh token missing",
        body: userId,
      };

      if (!refreshToken) {
        return res
        .status(400)
        .json(wrong);        
      }

      await revokeTokenHandler.handler(refreshToken, userId);

      //Borrar cookies

      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

       const response: ApiResponse<any> = {
        success: true,
        title: "jwt/sign",
        message: "jwt in sign",
        body: {
          revoked: true,          
        },
      };

      return res
      .status(200)
      .json(response);

    }
    catch(err: any){
      
      console.error("revokeToken error: ", err);

      return res.status(500)
      .json({error: err.message || "Internal Server"});
    }
  }
}
