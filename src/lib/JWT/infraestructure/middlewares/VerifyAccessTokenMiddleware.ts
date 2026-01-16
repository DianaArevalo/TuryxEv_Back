
import { express as ex, jwt } from "../../../Shared/Infraestructure/External";
import { refreshTokenHandler } from "../composition/jwt-composition";

export const verifyAccessTokenMiddleware = async (
  req: ex.Request,
  res: ex.Response,
  next: ex.NextFunction
) => {
  try {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: "missing access token" });
    }

    // 1. Intentar verificar el Access Token
    try {
      const payload = jwt.verify(accessToken, process.env.JWT_SECRET!);
      (req as any).user = payload;
      return next();
    } catch (err: any) {
      if (err.name !== "TokenExpiredError") {
        return res.status(401).json({ message: "invalid access token" });
      }
    }

    // 2. Si expira → refrescar automáticamente usando tu handler real
    const oldRefreshToken = req.cookies?.refreshToken;

    if (!oldRefreshToken) {
      return res.status(401).json({ message: "missing refresh token" });
    }

    // userId y payload vienen del req.body → en tu app los añade el frontend
    const { userId, payload } = req.body;

    const jwtEntity = await refreshTokenHandler.handler(
      oldRefreshToken,
      userId,
      payload ?? {}
    );

    const { accessToken: newAccess, refreshToken: newRefresh } =
      jwtEntity.toPrimitives();

    // Nuevas cookies
    res.cookie("accessToken", newAccess, {
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

    // decodificar token nuevo
    const decoded = jwt.decode(newAccess);
    (req as any).user = decoded;

    return next();
  } catch (err: any) {
    console.error("verifyAccessTokenMiddleware error:", err);
    return res.status(500).json({ message: "internal server error" });
  }
};