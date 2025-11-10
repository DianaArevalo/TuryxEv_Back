import { ValidationError } from '../../../../lib/Shared/domain/exeptions';
import { ApiResponse } from '../../../../lib/Shared/Infraestructure/ApiResponse';
import { ServiceContainer } from '../../../../lib/Shared/Infraestructure/ServiceContainer';
import { express as ex } from '../../../Shared/Infraestructure/External';
import { HotelPlanT, HotelStatusT } from '../../domain';

import { ProviderDataT } from '~/lib/Shared/domain/value-objects';

export class ExpressHotelController {
  async getAll(req: ex.Request, res: ex.Response) {
    const { page, limit } = req.query.page as { page?: string; limit?: string };

    const hotel = await ServiceContainer.hotel.getAll.handler({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

    const response: ApiResponse<any[]> = {
      success: true,
      title: 'Hotel',
      message: 'Se listan hoteles correctamente',
      body: hotel,
    };

    return res.status(200).json(response);
  }

  async getOneByEmail(req: ex.Request, res: ex.Response) {
    const { email } = req.query.page as { email?: string };

    if (!email) throw new ValidationError('La query email es necesario');

    const hotel = await ServiceContainer.hotel.getOneByEmail.handler({ email });

    const response: ApiResponse<any> = {
      success: true,
      title: 'Hotel',
      message: 'Se retorna el hotel dado el email',
      body: hotel,
    };

    return res.status(200).json(response);
  }

  async getOneById(req: ex.Request, res: ex.Response) {
    const { id } = req.query.page as { id?: string };

    if (!id) throw new ValidationError('La query id es necesario');

    const hotel = await ServiceContainer.hotel.getOneById.handler({ id });

    const response: ApiResponse<any> = {
      success: true,
      title: 'Hotel',
      message: 'Se retorna hotel dado un id correctamente',
      body: hotel,
    };

    return res.status(200).json(response);
  }

  async create(req: ex.Request, res: ex.Response) {
    const { name, email, password, location, role } = req.body as {
      name: string;
      email: string;
      password: string;
      location: string;
      role?: number;
    };

    const newHotel = await ServiceContainer.hotel.create.handler({
      name,
      email,
      idRole: role === 2 ? 'STAFF' : 'HOTEL',
      idPlan: 'FREE' as HotelPlanT,
      status: 'OPEN' as HotelStatusT,
      password,
      location,
      providerData: 'AUTH' as ProviderDataT,
    });

    const response: ApiResponse<typeof newHotel> = {
      success: true,
      title: 'Hotel creado correctamente',
      message: `Se creo el Hotel`,
      body: newHotel,
    };

    return res.status(201).json(response);
  }

  async edit(req: ex.Request, res: ex.Response) {
    const hotel = req.body as {
      hotelId: string;
      name?: string;
      password?: string;
      location?: string;
      idPlan?: string;
      score?: string;
      status?: string;
      picture?: string;
      freePlanEnd?: Date;
    };

    await ServiceContainer.hotel.edit.handler(hotel);

    const response: ApiResponse<null> = {
      success: true,
      title: 'Hotel editado correctamente',
      message: `Se editó el hotel.`,
      body: null,
    };

    return res.status(200).json(response);
  }

  async updateStatus(req: ex.Request, res: ex.Response) {
    const { id } = req.query.page as { id?: string };

    if (!id) throw new ValidationError('La query id es Necesario');

    const hotel = await ServiceContainer.hotel.updatedStatus.handler({ id });

    const response: ApiResponse<any> = {
      success: true,
      title: 'Hotel bloqueado',
      message: 'Eliminacion temporal en estado bloqueado',
      body: hotel,
    };

    return res.status(200).json(response);
  }

  async getAllByPlan(req: ex.Request, res: ex.Response) {
    const { page, limit, plan } = req.query.page as {
      page?: string;
      limit?: string;
      plan?: string;
    };

    if (!plan) throw new ValidationError('La query plan es necesaria');

    const hotel = await ServiceContainer.hotel.getByPlan.handler({
      plan: plan,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

    const response: ApiResponse<any[]> = {
      success: true,
      title: 'Hotel',
      message: 'Se listan todos los hoteles por plan',
      body: hotel,
    };

    return res.status(200).json(response);
  }

  async getAllByRole(req: ex.Request, res: ex.Response) {
    const { page, limit, role } = req.query.page as {
      page?: string;
      limit?: string;
      role?: string;
    };

    if (!role) throw new ValidationError('La query role es necesaria');

    const hotel = await ServiceContainer.hotel.getByRole.handler({
      role: role,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

    const response: ApiResponse<any[]> = {
      success: true,
      title: 'Hotel',
      message: 'Se listan todos los hoteles por roles correctamente',
      body: hotel,
    };

    return res.status(200).json(response);
  }

  async getAllByStatus(req: ex.Request, res: ex.Response) {
    const { page, limit, status } = req.query.page as {
      page?: string;
      limit?: string;
      status?: string;
    };

    if (!status) throw new ValidationError('La query role es necesaria');

    const hotel = await ServiceContainer.hotel.getByStatus.handler({
      status: status,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

    const response: ApiResponse<any[]> = {
      success: true,
      title: 'Hotel',
      message: 'Se listan todos los hoteles por status correctamente',
      body: hotel,
    };

    return res.status(200).json(response);
  }

  async getAllByProvider(req: ex.Request, res: ex.Response) {
    const { page, limit, provider } = req.query.page as {
      page?: string;
      limit?: string;
      provider?: string;
    };

    if (!provider) throw new ValidationError('La query role es necesaria');

    const hotel = await ServiceContainer.hotel.getByProvider.handler({
      providerData: provider,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

    const response: ApiResponse<any[]> = {
      success: true,
      title: 'Hotel',
      message: 'Se listan todos los hoteles por proveedor correctamente',
      body: hotel,
    };

    return res.status(200).json(response);
  }

  async checkHotelFreePlans(_req: ex.Request, res: ex.Response): Promise<void> {
    const currentDate = new Date();

    await ServiceContainer.hotel.CheckHotelFreePlans.handler({
      currentDate,
      page: 1,
      limit: 50,
    });

    res.status(200).json({
      message:
        'Verificación completada. Los hoteles con plan FREE vencido fueron actualizados a estado BLOCKED (si correspondía).',
    });
  }
}
