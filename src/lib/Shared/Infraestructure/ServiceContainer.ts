import { UserCreate } from "../../User/application/UserCreate/UserCreate";
import { UserGetOneById } from "../../User/application/UserGetOneById/UserGetOneById";
import { UserEdit } from "../../User/application/UserEdit/UserEdit";
import { UserDelete } from "../../User/application/UserDelete/UserDelete";
import { MongoUserRepository } from "../../User/infrastructure/MongoUserRepository";
import { UserGetAll } from "../../User/application/UserGetAll/UserGetAll";
import { MongoReservationRepository } from "../../Reservation/infrastructure/repositories/mongo-repository";
import {
  CancelReservation,
  ConfirmReservation,
  CreateReservation,
  EditReservation,
  GetAllByHotelId,
  GetOneByReservationId,
  GetUserReservations,
} from "../../Reservation/application";

const userRepository = new MongoUserRepository();
const reservationRepository = new MongoReservationRepository();

export const ServiceContainer = {
  user: {
    getAll: new UserGetAll(userRepository),
    create: new UserCreate(userRepository),
    getOneById: new UserGetOneById(userRepository),
    edit: new UserEdit(userRepository),
    delete: new UserDelete(userRepository),
  },
  reservation: {
    getOneByReservationId: new GetOneByReservationId(reservationRepository),
    getUserReservations: new GetUserReservations(reservationRepository),
    getAllByHotelId: new GetAllByHotelId(reservationRepository),
    create: new CreateReservation(reservationRepository),
    edit: new EditReservation(reservationRepository),
    confirm: new ConfirmReservation(reservationRepository),
    cancel: new CancelReservation(reservationRepository),
  },
};
