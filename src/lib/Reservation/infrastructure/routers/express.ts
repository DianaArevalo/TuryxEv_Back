import { express as ex } from "../../../Shared/Infraestructure/External";
import { ExpressReservationController } from "../controllers/express";

const controller = new ExpressReservationController();
const ExpressReservationRouter = ex.Router();

ExpressReservationRouter.get(
  "/get-one-by-id/:reservationId",
  controller.getOneByReservationId
);
ExpressReservationRouter.get(
  "/get-all-user-reservations/:id",
  controller.getAllUserReservations
);
ExpressReservationRouter.get(
  "/get-all-by-hotel-id/:id",
  controller.getAllByHotelId
);
ExpressReservationRouter.post("/create", controller.create);
ExpressReservationRouter.patch("/edit", controller.edit);
ExpressReservationRouter.patch("/confirm", controller.confirm);
ExpressReservationRouter.patch("/cancel", controller.cancel);

export { ExpressReservationRouter };
