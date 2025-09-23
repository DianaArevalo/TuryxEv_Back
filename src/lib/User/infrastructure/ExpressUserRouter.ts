import { express as ex } from "../../Shared/Infraestructure/External";
import { ExpressUserController } from "./ExpressUserController";

const controller = new ExpressUserController();

const ExpressUserRouter = ex.Router();

ExpressUserRouter.get("/users/", controller.getAll);
ExpressUserRouter.get("/user/:id", controller.getOneById);
ExpressUserRouter.post("/user/", controller.create);
ExpressUserRouter.put("/user/", controller.edit);
ExpressUserRouter.delete("/user/:id", controller.delete);

export { ExpressUserRouter };
