import { ApiResponse } from "../../../User/infrastructure/ApiResponse";
import { express as ex } from "../../../Shared/Infraestructure/External";
import { ServiceContainer } from "../../../Shared/Infraestructure/ServiceContainer";
import { ValidationError } from "../../../Shared/domain/exeptions";

export class ExpressBusinessController {
  async create(req: ex.Request, res: ex.Response) {
    const { name, email, password, location } = req.body as {
      name: string;
      email: string;
      password: string;
      location: string;
    };

    await ServiceContainer.business.create.handler({
      name,
      email,
      idRole: "BUSINESS",
      idPlan: "FREE",
      status: "OPEN",
      password,
      location,
      providerData: "AUTH",
    });

    const response: ApiResponse<null> = {
      success: true,
      title: "Negocio creado correctamente",
      message: `Se creó el negocio.`,
      body: null,
    };

    return res.status(201).json(response);
  }

  async edit(req: ex.Request, res: ex.Response) {
    const business = req.body as {
      businessId: string;
      name?: string;
      password?: string;
      location?: string;
      idPlan?: string;
      score?: number;
      status?: string;
      picture?: string;
    };

    await ServiceContainer.business.edit.handler(business);

    const response: ApiResponse<null> = {
      success: true,
      title: "Negocio editado correctamente",
      message: `Se editó el negocio.`,
      body: null,
    };

    return res.status(200).json(response);
  }

  async getAll(req: ex.Request, res: ex.Response) {
    const page = req.query.page;
    const limit = req.query.limit;

    const business = await ServiceContainer.business.getAll.handler({
      page: page ? Number(page.toString()) : undefined,
      limit: limit ? Number(limit.toString()) : undefined,
    });

    const response: ApiResponse<any[]> = {
      success: true,
      title: "Negocios",
      message: "Se listan todos los negocios correctamente",
      body: business,
    };

    return res.status(200).json(response);
  }

  async getAllByPlan(req: ex.Request, res: ex.Response) {
    const plan = req.query.plan;
    const page = req.query.page;
    const limit = req.query.limit;

    if (!plan) throw new ValidationError("La query plan es necesario");

    const business = await ServiceContainer.business.getAllByPlan.handler({
      plan: plan.toString(),
      page: page ? Number(page.toString()) : undefined,
      limit: limit ? Number(limit.toString()) : undefined,
    });

    const response: ApiResponse<any[]> = {
      success: true,
      title: "Negocios",
      message: "Se listan todos los negocios correctamente",
      body: business,
    };

    return res.status(200).json(response);
  }

  async getAllByRole(req: ex.Request, res: ex.Response) {
    const role = req.query.role;
    const page = req.query.page;
    const limit = req.query.limit;

    if (!role) throw new ValidationError("La query role es necesario");

    const business = await ServiceContainer.business.getAllByRole.handler({
      role: role.toString(),
      page: page ? Number(page.toString()) : undefined,
      limit: limit ? Number(limit.toString()) : undefined,
    });

    const response: ApiResponse<any[]> = {
      success: true,
      title: "Negocios",
      message: "Se listan todos los negocios correctamente",
      body: business,
    };

    return res.status(200).json(response);
  }

  async getAllByStatus(req: ex.Request, res: ex.Response) {
    const status = req.query.status;
    const page = req.query.page;
    const limit = req.query.limit;

    if (!status) throw new ValidationError("La query plan es necesario");

    const business = await ServiceContainer.business.getAllByStatus.handler({
      status: status.toString(),
      page: page ? Number(page.toString()) : undefined,
      limit: limit ? Number(limit.toString()) : undefined,
    });

    const response: ApiResponse<any[]> = {
      success: true,
      title: "Negocios",
      message: "Se listan todos los negocios correctamente",
      body: business,
    };

    return res.status(200).json(response);
  }

  async getAllByProviderData(req: ex.Request, res: ex.Response) {
    const provider = req.query.provider;
    const page = req.query.page;
    const limit = req.query.limit;

    if (!provider) throw new ValidationError("La query provider es necesaria");

    const business = await ServiceContainer.business.getAllByProvider.handler({
      providerData: provider.toString(),
      page: page ? Number(page.toString()) : undefined,
      limit: limit ? Number(limit.toString()) : undefined,
    });

    const response: ApiResponse<any[]> = {
      success: true,
      title: "Negocios",
      message: "Se listan todos los negocios dado un provider correctamente",
      body: business,
    };

    return res.status(200).json(response);
  }

  async getOneByEmail(req: ex.Request, res: ex.Response) {
    const email = req.query.email;

    if (!email) throw new ValidationError("La query email es necesario");

    const business = await ServiceContainer.business.getOneByEmail.handler({
      email: email.toString(),
    });

    const response: ApiResponse<any> = {
      success: true,
      title: "Negocio",
      message: "Se retorna el negocio dado un email",
      body: business,
    };

    return res.status(200).json(response);
  }

  async getOneById(req: ex.Request, res: ex.Response) {
    const id = req.query.id;

    if (!id) throw new ValidationError("La query id es necesario");

    const business = await ServiceContainer.business.getOneById.handler({
      id: id.toString(),
    });

    const response: ApiResponse<any> = {
      success: true,
      title: "Negocio",
      message: "Se retorna un negocio dado un id correctamente",
      body: business,
    };

    return res.status(200).json(response);
  }

  async softDelete(req: ex.Request, res: ex.Response) {
    const id = req.query.id;

    if (!id) throw new ValidationError("La query id es necesario");

    const business = await ServiceContainer.business.softDelete.handler({
      id: id.toString(),
    });

    const response: ApiResponse<any> = {
      success: true,
      title: "Negocio eliminado",
      message: "Se eliminó un negocio",
      body: business,
    };

    return res.status(200).json(response);
  }
}
