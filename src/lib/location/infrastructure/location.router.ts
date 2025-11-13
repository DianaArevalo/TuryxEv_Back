import { controllers } from "./location.composition";

import { express as ex } from "~/lib/Shared/Infraestructure/External";

const ExpressLocationRouter = ex.Router();

const {
  getLocationByOwnerController,
  getValidCitiesController,
  editLocationController,
} = controllers;

ExpressLocationRouter.get(
  "/get-location-by-owner",
  getLocationByOwnerController.handle.bind(getLocationByOwnerController)
);

ExpressLocationRouter.get(
  "/get-valid-cities",
  getValidCitiesController.handle.bind(getValidCitiesController)
);

ExpressLocationRouter.patch(
<<<<<<< HEAD
  "/update-location",
  updateLocationController.handle.bind(updateLocationController)
=======
  '/edit-location',
  editLocationController.handle.bind(editLocationController),
>>>>>>> f17658e (refactor(business): business hexagon refactorized)
);

export { ExpressLocationRouter };
