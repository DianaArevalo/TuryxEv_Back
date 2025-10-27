import { express as ex } from "../../../Shared/Infraestructure/External";
import { ExpressBusinessController } from "../controllers/express";

const controller = new ExpressBusinessController();
const ExpressBusinessRouter = ex.Router();

ExpressBusinessRouter.post("/create", controller.create);
ExpressBusinessRouter.patch("/edit", controller.edit);
ExpressBusinessRouter.get("/get-all", controller.getAll);
ExpressBusinessRouter.get("/get-all-by-plan", controller.getAllByPlan);
ExpressBusinessRouter.get("/get-all-by-role", controller.getAllByRole);
ExpressBusinessRouter.get("/get-all-by-status", controller.getAllByStatus);
ExpressBusinessRouter.get(
  "/get-all-by-provider",
  controller.getAllByProviderData
);
ExpressBusinessRouter.get("/get-one-by-email", controller.getOneByEmail);
ExpressBusinessRouter.get("/get-one-by-id", controller.getOneById);
ExpressBusinessRouter.patch("/delete", controller.softDelete);

export { ExpressBusinessRouter };
