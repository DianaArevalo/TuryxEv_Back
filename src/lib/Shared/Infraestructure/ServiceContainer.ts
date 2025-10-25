import { UserCreate } from "../../User/application/UserCreate/UserCreate";
import { UserGetOneById } from "../../User/application/UserGetOneById/UserGetOneById";
import { UserEdit } from "../../User/application/UserEdit/UserEdit";
import { UserDelete } from "../../User/application/UserDelete/UserDelete";
import { MongoUserRepository } from "../../User/infrastructure/MongoUserRepository";
import { UserGetAll } from "../../User/application/UserGetAll/UserGetAll";
import { MongoReservationRepository } from "../../Reservation/infrastructure/repositories/mongo-reservation-repository";
import {
  CancelReservation,
  ConfirmReservation,
  CreateReservation,
  EditReservation,
  GetAllByHotelId,
  GetOneByReservationId,
  GetUserReservations,
} from "../../Reservation/application";
import { 
  FindExpiredPlans,
  HotelCreate, 
  HotelEdit, 
  HotelGetALL, 
  HotelGetByPlan, 
  HotelGetByProvider, 
  HotelGetByRol, 
  HotelGetByStatus, 
  HotelGetOnByEmail, 
  HotelGetOneById, 
  HotelUpdatedStatus 
} from "~/lib/Hotel/application";

import { MongoHotelRepository } from "~/lib/Hotel/infraestructure/repositories/MongoHotelRepository";
import { MongoLocationRepository } from "~/lib/Hotel/infraestructure/repositories/MongoLocationRepository";



const userRepository = new MongoUserRepository();
const reservationRepository = new MongoReservationRepository();
const hotelRepository = new MongoHotelRepository();
const locationRepository = new MongoLocationRepository();

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

  hotel: {
    getAll: new HotelGetALL(hotelRepository),
    getOneByEmail: new HotelGetOnByEmail(hotelRepository),
    getOneById: new HotelGetOneById(hotelRepository),
    create: new HotelCreate(hotelRepository, locationRepository),
    edit: new HotelEdit(hotelRepository, locationRepository),
    updatedStatus: new HotelUpdatedStatus(hotelRepository),
    getByPlan: new HotelGetByPlan(hotelRepository),
    getByRole: new HotelGetByRol(hotelRepository),
    getByStatus: new HotelGetByStatus(hotelRepository),
    getByProvider: new HotelGetByProvider(hotelRepository),
    FindExpiredPlans: new FindExpiredPlans(hotelRepository),
  }
};
