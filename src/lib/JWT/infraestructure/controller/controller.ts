import { ApiResponse } from "~/lib/Shared/Infraestructure/ApiResponse";
import { express as ex } from "../../../Shared/Infraestructure/External";
import { signTokenHandler } from "../composition/jwt-composition";

export class controllerJwt {
  static async JwtSign(req: ex.Request, res: ex.Response) {
    try {
      const { userId, payload } = req.body;

      const wrong: ApiResponse<any[]> = {
        success: false,
        title: "user not found in token",
        message: "user not found in token",
        body: userId,
      };

      if (!userId) return res.status(400).json(wrong);

      const jwtEntity = await signTokenHandler.handler(userId, payload ?? {});

      const response: ApiResponse<any[]> = {
        success: true,
        title: "jwt/sign",
        message: "jwt in sign",
        body: userId,
      };

      return res.status(200).json(response);
    } catch (err: any) {
      console.error("SignToken error:", err);
      return res.status(500).json({ error: err.message || "Internal error" });
    }
  }

  static async JwtRefresh(req: ex.Request, res: ex.Response) {}

  static async JwtRevoke(req: ex.Request, res: ex.Response) {}
}
