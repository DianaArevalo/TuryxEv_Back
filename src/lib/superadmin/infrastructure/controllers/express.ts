import { ServiceContainer } from "~/lib/Shared/Infraestructure/ServiceContainer";
import { express as ex } from "../../../Shared/Infraestructure/External";
import { ApiResponse } from "~/lib/User/infrastructure/ApiResponse";

export class ExpressSuperAdminController {
  async create(req: ex.Request, res: ex.Response) {
    const body = req.body as { name: string; email: string; password: string };

    await ServiceContainer.superAdmin.create.handler(body);

    const response: ApiResponse<null> = {
      success: true,
      title: "Superadministrador creado correctamente",
      message: "Se creó el superadministrador",
      body: null,
    };

    return res.status(201).json(response);
  }

  async edit(req: ex.Request, res: ex.Response) {
    const body = req.body as {
      superAdminId: string;
      name?: string;
      email?: string;
      password?: string;
      canCreateSuperUser?: boolean;
      canEditUsers?: boolean;
      canViewReservations?: boolean;
      canBlockAccounts?: boolean;
      canEditHotels?: boolean;
      canEditBusiness?: boolean;
      lastLogin?: Date;
    };

    await ServiceContainer.superAdmin.edit.handler(body);

    const response: ApiResponse<null> = {
      success: true,
      title: "Superadministrador editado correctamente",
      message: "Se editó el superadministrador",
      body: null,
    };

    return res.status(200).json(response);
  }

  async getAll(req: ex.Request, res: ex.Response) {
    const superAdmins = await ServiceContainer.superAdmin.getAll.handler();

    const response: ApiResponse<any[]> = {
      success: true,
      title: "Superadministradores",
      message: "Superadministradores proveidos correctamente",
      body: superAdmins,
    };

    return res.status(200).json(response);
  }

  async getAllByIsActive(req: ex.Request, res: ex.Response) {
    const isActive = req.params.isActive;

    const superAdmins =
      await ServiceContainer.superAdmin.getAllByIsActive.handler({
        isActive: isActive ? Boolean(isActive) : true,
      });

    const response: ApiResponse<any[]> = {
      success: true,
      title: "Superadministradores",
      message: "Superadministradores proveidos correctamente",
      body: superAdmins,
    };

    return res.status(200).json(response);
  }

  async getOneByEmail(req: ex.Request, res: ex.Response) {
    const email = req.params.email;

    const superAdmin = await ServiceContainer.superAdmin.getOneByEmail.handler({
      email: email,
    });

    const response: ApiResponse<any> = {
      success: true,
      title: "Superadministrador",
      message: "Superadministrador proveido correctamente",
      body: superAdmin,
    };

    return res.status(200).json(response);
  }

  async getOneById(req: ex.Request, res: ex.Response) {
    const id = req.params.id;

    const superAdmin = await ServiceContainer.superAdmin.getOneById.handler({
      id: id,
    });

    const response: ApiResponse<any> = {
      success: true,
      title: "Superadministrador",
      message: "Superadministrador proveido correctamente",
      body: superAdmin,
    };

    return res.status(200).json(response);
  }

  async editBusiness(req: ex.Request, res: ex.Response) {
    const body = req.body as { businessId: string; status?: string };

    await ServiceContainer.superAdmin.editBusiness.handler(body);

    const response: ApiResponse<null> = {
      success: true,
      title: "Negocio",
      message: "Negocio editado correctamente",
      body: null,
    };

    return res.status(200).json(response);
  }

  async getAllReservationsByHotelId(req: ex.Request, res: ex.Response) {
    const hotelId = req.params.hotelId;

    const reservations =
      await ServiceContainer.superAdmin.getAllReservationsByHotelId.handler(
        hotelId
      );

    const response: ApiResponse<any[]> = {
      success: true,
      title: "Reservas",
      message: "Reservas proveidas correctamente",
      body: reservations,
    };

    return res.status(200).json(response);
  }

  async getAllUserReservations(req: ex.Request, res: ex.Response) {
    const userId = req.params.userId;

    const reservations =
      await ServiceContainer.superAdmin.getAllUserReservations.handler(userId);

    const response: ApiResponse<any[]> = {
      success: true,
      title: "Reservas",
      message: "Reservas proveidas correctamente",
      body: reservations,
    };

    return res.status(200).json(response);
  }

  async getOneReservation(req: ex.Request, res: ex.Response) {
    const id = req.params.id;

    const superAdmin =
      await ServiceContainer.superAdmin.getOneReservation.handler(id);

    const response: ApiResponse<any> = {
      success: true,
      title: "Reserva",
      message: "Reserva proveida correctamente",
      body: superAdmin,
    };

    return res.status(200).json(response);
  }
}
