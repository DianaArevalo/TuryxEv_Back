import { ApiResponse } from "../../../../lib/Shared/Infraestructure/ApiResponse";
import { express as ex } from "../../../Shared/Infraestructure/External";
import { JwtControllerPort } from "../../domain/ports/driver/JwtControllerPort";

import { ValidationError } from "../../../../lib/Shared/domain";
import { JwtRefreshResponse, JwtRevokeResponse, JwtSignResponse } from "./JwtHttDtos";

export class JwtHttpController {
  constructor(private readonly jwtService: JwtControllerPort) {}

  jwtSign = async (
    req: ex.Request,
    res: ex.Response<ApiResponse<JwtSignResponse>>
  ): Promise<ex.Response> => {
    try {
      const { userId } = req.body as { userId?: string };

      if (!userId?.trim()) {
        return res.status(400).json({
          success: false,
          title: "jwt/sign",
          message: "userId is required",
          
        });
      }

      const jwtEntity = await this.jwtService.sign(userId);
      const { accessToken, refreshToken, expiration } =
        jwtEntity.toPrimitives();

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 15 * 60 * 1000,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        title: "jwt/sign",
        message: "authenticated",
        body: {
          authenticated: true,
          expiration,
        },
      });
    } catch (error: unknown) {
      return this.handleError(error, res, "jwt/sign");
    }
  };

  jwtRefresh = async (
    req: ex.Request,
    res: ex.Response<ApiResponse<JwtRefreshResponse>>
  ): Promise<ex.Response> => {
    try {
      const refreshToken = req.cookies?.refreshToken;
      const { userId } = req.body as { userId: string };

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          title: "jwt/refresh",
          message: "refresh token missing",
          
        });
      }

      const jwtEntity = await this.jwtService.refresh(refreshToken, userId);
      const { accessToken, refreshToken: newRefresh, expiration } =
        jwtEntity.toPrimitives();

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 15 * 60 * 1000,
      });

      res.cookie("refreshToken", newRefresh, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        title: "jwt/refresh",
        message: "tokens refreshed",
        body: {
          refreshed: true,
          expiration,
        },
      });
    } catch (error: unknown) {
      return this.handleError(error, res, "jwt/refresh");
    }
  };

  jwtRevoke = async (
    req: ex.Request,
    res: ex.Response<ApiResponse<JwtRevokeResponse>>
  ): Promise<ex.Response> => {
    try {
      const refreshToken = req.cookies?.refreshToken;
      const { userId } = req.body as { userId: string };

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          title: "jwt/revoke",
          message: "refresh token missing",
          
        });
      }

      await this.jwtService.revoke(refreshToken, userId);

      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      return res.status(200).json({
        success: true,
        title: "jwt/revoke",
        message: "session revoked",
        body: {
          revoked: true,
        },
      });
    } catch (error: unknown) {
      return this.handleError(error, res, "jwt/revoke");
    }
  };

  private handleError(
    error: unknown,
    res: ex.Response,
    title: string
  ): ex.Response {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        title,
        message: error.message,
        body: null,
      });
    }

    console.error(`${title} error:`, error);

    return res.status(500).json({
      success: false,
      title,
      message: "Internal server error",
      body: null,
    });
  }
}
