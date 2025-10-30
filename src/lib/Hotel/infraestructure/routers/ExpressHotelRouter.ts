import { ExpressHotelController } from "../controller/express";
import {express as ex} from "../../../Shared/Infraestructure/External"

const controller = new ExpressHotelController();
const ExpressHotelRouter = ex.Router();

ExpressHotelRouter.get("/get-all", controller.getAll);
ExpressHotelRouter.get("/get-one-by-email", controller.getOneByEmail);
ExpressHotelRouter.get("/get-one-by-id", controller.getOneById);
ExpressHotelRouter.post("/create", controller.create);
ExpressHotelRouter.patch("/edit", controller.edit);
ExpressHotelRouter.patch("/delete-updated", controller.updateStatus)



ExpressHotelRouter.get("/get-by-plan", controller.getAllByPlan);
ExpressHotelRouter.get("/get-by-role", controller.getAllByRole);
ExpressHotelRouter.get("/get-by-status", controller.getAllByStatus);
ExpressHotelRouter.get("/get-by-provider", controller.getAllByProvider);
ExpressHotelRouter.patch("/find-expired-plans", controller.checkHotelFreePlans);

export { ExpressHotelRouter };