import { JwtHttpController } from "../controller/JwtHttpController";
import { express as ex } from "../../../Shared/Infraestructure/External";
import { verifyAccessTokenMiddleware } from "../middlewares/VerifyAccessTokenMiddleware";

const controller = new JwtHttpController();
const ExpressJwtRouter = ex.Router();

ExpressJwtRouter.post("/jwt/sign", controller.jwtSign);
ExpressJwtRouter.post("/jwt/refresh", controller.jwtRefresh);
ExpressJwtRouter.post("/jwt/revoke", verifyAccessTokenMiddleware, controller.jwtRevoke);

export { ExpressJwtRouter };
