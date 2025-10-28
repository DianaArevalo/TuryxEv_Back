import { express as ex } from "../../../Shared/Infraestructure/External";
import { ExpressSuperAdminController } from "../controllers/express";

const controller = new ExpressSuperAdminController();
const ExpressSuperAdminRouter = ex.Router();

ExpressSuperAdminRouter.post("/create", controller.create);
ExpressSuperAdminRouter.patch("/edit", controller.edit);
ExpressSuperAdminRouter.get("/get-all", controller.getAll);
ExpressSuperAdminRouter.get(
  "/get-all-by-isactive",
  controller.getAllByIsActive
);
ExpressSuperAdminRouter.get("/get-one-by-email", controller.getOneByEmail);
ExpressSuperAdminRouter.get("/get-one-by-id", controller.getOneById);
ExpressSuperAdminRouter.get("/business/edit", controller.editBusiness);
ExpressSuperAdminRouter.get(
  "/reservations/get-all-by-hotel-id",
  controller.getAllReservationsByHotelId
);
ExpressSuperAdminRouter.get(
  "/reservations/get-all-user-reservations",
  controller.getAllUserReservations
);
ExpressSuperAdminRouter.get(
  "/reservations/get-one-reservation",
  controller.getOneReservation
);
ExpressSuperAdminRouter.patch("/delete", controller.softDelete);

export { ExpressSuperAdminRouter };
