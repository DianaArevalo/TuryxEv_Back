import { express as ex } from "../../../Shared/Infraestructure/External";
import { ExpressReservationController } from "../controllers/express";

const controller = new ExpressReservationController();
const ExpressReservationRouter = ex.Router();

ExpressReservationRouter.get("get-one-by-id", controller.getOneByReservationId);
ExpressReservationRouter.get(
  "get-all-user-reservations",
  controller.getAllUserReservations
);
ExpressReservationRouter.get("get-all-by-hotel-id", controller.getAllByHotelId);
ExpressReservationRouter.post("create", controller.create);
ExpressReservationRouter.patch("edit", controller.edit);
ExpressReservationRouter.put("confirm", controller.confirm);
ExpressReservationRouter.put("cancel", controller.cancel);

export { ExpressReservationRouter };
