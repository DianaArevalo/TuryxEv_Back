import { ExpressUserController } from "../controllers/ExpressUserController";
import {express as ex} from "../../../Shared/Infraestructure/External"

const controller = new ExpressUserController();
const ExpressUserRouter = ex.Router();

ExpressUserRouter.post("/create-user", controller.create);
ExpressUserRouter.get("/get-user-one-by-id", controller.getOneById);
ExpressUserRouter.get("/get-all-users", controller.getAll);
ExpressUserRouter.get("/get-user-by-email", controller.getOneByEmail);
ExpressUserRouter.patch("/edit-user", controller.edit);
ExpressUserRouter.patch("/soft-delete/:id", controller.softDelete);
ExpressUserRouter.get("/get-all-by-status", controller.getAllByStatus)

export { ExpressUserRouter };
