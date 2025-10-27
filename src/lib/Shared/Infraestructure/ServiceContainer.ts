import { UserCreate } from "../../User/application/UserCreate/UserCreate";
import { UserGetOneById } from "../../User/application/UserGetOneById/UserGetOneById";
import { UserEdit } from "../../User/application/UserEdit/UserEdit";
import { UserSoftDelete } from "../../User/application/UserSoftDelete/UserSoftDelete";
import { MongoUserRepository } from "../../User/infrastructure/repositories/MongoUserRepository";
import { UserGetAll } from "../../User/application/UserGetAll/UserGetAll";
import { MongoReservationRepository } from "../../Reservation/infrastructure/repositories/mongo-reservation-repository";
import { MongoHotelRepository } from "../../../lib/Hotel/infraestructure/repositories/MongoHotelRepository";
import { InMemoryCityRepository } from "../../../lib/Hotel/infraestructure/repositories/InMemoryCityRepository";

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
  CheckHotelFreePlans,
  HotelCreate,
  HotelEdit,
  HotelGetALL,
  HotelGetByPlan,
  HotelGetByProvider,
  HotelGetByRol,
  HotelGetByStatus,
  HotelGetOnByEmail,
  HotelGetOneById,
  HotelUpdatedStatus,
} from "../../../lib/Hotel/application";

import {
  CreateBusiness,
  EditBusiness,
  GetAllBusiness,
  GetAllBusinessByPlan,
  GetAllBusinessByRole,
  GetAllBusinessByStatus,
  GetBusinessByProviderData,
  GetOneBusinessByEmail,
  GetOneBusinessById,
  SoftDeleteBusiness,
} from "../../bussiness/application";
import {
  UserGetAllByStatus,
  UserGetOneByEmail,
} from "../../../lib/User/application";
import { MongoBusinessRepository } from "../../bussiness/infrastructure/repositories/business-mongo-repository";
import { InMemoryLocationRepository } from "../../bussiness/infrastructure/repositories/location-in-memory-repository";
import { CreateSuperAdmin } from "~/lib/superadmin/application/create-superadmin/create-superadmin";
import { MongoSuperAdminRepository } from "~/lib/superadmin/infrastructure/repositories/mongo-superadmin-repository";
import { SuperAdminEditBusiness } from "~/lib/superadmin/application/superadmin-edit-business/superadmin-edit-business";
import { ForBusinessEditAdapter } from "~/lib/superadmin/infrastructure/adapters/driven/for-business-edit-proxy";
import { EditSuperAdmin } from "~/lib/superadmin/application/edit-superadmin/edit-superadmin";
import { GetAllSuperAdmins } from "~/lib/superadmin/application/get-all-superadmins/get-all-superadmins";
import { SuperAdminGetAllReservationsByHotelId } from "~/lib/superadmin/application/superadmin-get-all-reservations-by-hotel/superadmin-get-all-reservations-by-hotel";
import { ForViewReservationsAdapter } from "~/lib/superadmin/infrastructure/adapters/driven/for-view-reservations-adapter-proxy";
import { GetAllSuperAdminsByIsActive } from "~/lib/superadmin/application/get-all-superadmins-by-isactive/get-all-superadmins-by-isactive";
import { GetOneSuperAdminByEmail } from "~/lib/superadmin/application/get-one-superadmin-by-email/get-one-superadmin-by-email";
import { GetOneSuperAdminById } from "~/lib/superadmin/application/get-one-superadmin-by-id/get-one-superadmin-by-id";
import { SuperAdminGetAllUserReservations } from "~/lib/superadmin/application/superadmin-get-all-user-reservations/superadmin-get-all-user-reservations";
import { SuperAdminGetOneReservationById } from "~/lib/superadmin/application/superadmin-get-one-reservation-by-id/superadmin-get-one-reservation-by-id";

const userRepository = new MongoUserRepository();
const reservationRepository = new MongoReservationRepository();
const hotelRepository = new MongoHotelRepository();
const cityRepository = new InMemoryCityRepository();
const businessRepository = new MongoBusinessRepository();
const locationRepository = new InMemoryLocationRepository(); // TODO: Change to MongoLocationRepository
const superAdminRepository = new MongoSuperAdminRepository();

const superAdminForEditbusiness = new ForBusinessEditAdapter(
  businessRepository,
  locationRepository
);
const superAdminForViewReservations = new ForViewReservationsAdapter(
  reservationRepository
);

export const ServiceContainer = {
  user: {
    getAll: new UserGetAll(userRepository),
    create: new UserCreate(userRepository),
    getOneById: new UserGetOneById(userRepository),
    edit: new UserEdit(userRepository),
    softDelete: new UserSoftDelete(userRepository),
    getOneByEmail: new UserGetOneByEmail(userRepository),
    getAllByStatus: new UserGetAllByStatus(userRepository),
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
    create: new HotelCreate(hotelRepository, cityRepository),
    edit: new HotelEdit(hotelRepository, cityRepository),
    updatedStatus: new HotelUpdatedStatus(hotelRepository),
    getByPlan: new HotelGetByPlan(hotelRepository),
    getByRole: new HotelGetByRol(hotelRepository),
    getByStatus: new HotelGetByStatus(hotelRepository),
    getByProvider: new HotelGetByProvider(hotelRepository),
    CheckHotelFreePlans: new CheckHotelFreePlans(hotelRepository),
  },

  business: {
    create: new CreateBusiness(businessRepository, locationRepository),
    edit: new EditBusiness(businessRepository, locationRepository),
    getAll: new GetAllBusiness(businessRepository),
    getAllByPlan: new GetAllBusinessByPlan(businessRepository),
    getAllByRole: new GetAllBusinessByRole(businessRepository),
    getAllByStatus: new GetAllBusinessByStatus(businessRepository),
    getAllByProvider: new GetBusinessByProviderData(businessRepository),
    getOneByEmail: new GetOneBusinessByEmail(businessRepository),
    getOneById: new GetOneBusinessById(businessRepository),
    softDelete: new SoftDeleteBusiness(businessRepository),
  },
  superAdmin: {
    create: new CreateSuperAdmin(superAdminRepository),
    edit: new EditSuperAdmin(superAdminRepository),
    getAll: new GetAllSuperAdmins(superAdminRepository),
    getAllByIsActive: new GetAllSuperAdminsByIsActive(superAdminRepository),
    getOneByEmail: new GetOneSuperAdminByEmail(superAdminRepository),
    getOneById: new GetOneSuperAdminById(superAdminRepository),

    editBusiness: new SuperAdminEditBusiness(superAdminForEditbusiness),
    getAllReservationsByHotelId: new SuperAdminGetAllReservationsByHotelId(
      superAdminForViewReservations
    ),
    getAllUserReservations: new SuperAdminGetAllUserReservations(
      superAdminForViewReservations
    ),
    getOneReservation: new SuperAdminGetOneReservationById(
      superAdminForViewReservations
    ),
  },
};
