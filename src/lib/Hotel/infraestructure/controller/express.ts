import { ServiceContainer } from "../../../../lib/Shared/Infraestructure/ServiceContainer";
import {express  as ex} from "../../../Shared/Infraestructure/External"
import { ApiResponse } from "../../../../lib/Shared/Infraestructure/ApiResponse";
import { ValidationError } from "../../../../lib/Shared/domain/exeptions";
import { HotelId, HotelPlanT, HotelRoleT, HotelStatusT, ProviderDataT } from "../../domain";

export class ExpressHotelController {
    async getAll(req: ex.Request, res: ex.Response) {
        const page = req.query.page;
        const limit = req.query.limit;

        const hotel = await ServiceContainer.hotel.getAll.handler({
                page: page ? Number(page.toString()) : undefined,
                limit: limit ? Number(limit.toString()) : undefined,
        });

        const response: ApiResponse<any[]> = {
            success: true,
            title: "Hotel",
            message: "Se listan hoteles correctamente",
            body: hotel,
        };

        return res.status(200).json(response);
    }
    
    async getOneByEmail(req: ex.Request, res: ex.Response){
        const email = req.query.email;

        if (!email) throw new ValidationError("La query email es necesario");

        const hotel = await ServiceContainer.hotel.getOneByEmail.handler({
            email: email.toString(),
        });

        const response: ApiResponse<any> = {
            success: true,
            title: "Hotel",
            message: "Se retorna el hotel dado el email",
            body: hotel,
        };

        return res.status(200).json(response);
    }

    async getOneById(req: ex.Request, res: ex.Response){
        const id = req.query.id;

        if(!id) throw new ValidationError("La query id es necesario");

        const hotel = await ServiceContainer.hotel.getOneById.handler({
            id: id.toString(),
        });

        const response: ApiResponse<any> = {
            success: true,
            title: "Hotel",
            message: "Se retorna hotel dado un id correctamente",
            body: hotel,
        };

        return res.status(200).json(response);
    }

    async create(req: ex.Request, res: ex.Response){
        const { name, email, password, location, role } = req.body as {
            name: string;
            email: string;
            password: string;
            location: string;
            role?: number                   
        };

        const newHotel = await ServiceContainer.hotel.create.handler({
            name,
            email,
            idRole: role === 2 ? "STAFF": "HOTEL",
            idPlan: "FREE" as HotelPlanT,
            status: "OPEN" as HotelStatusT,
            password,
            location,         
            providerData: "AUTH" as ProviderDataT,
        });

        const response: ApiResponse<typeof newHotel> = {
            success: true,
            title: "Hotel creado correctamente",
            message: `Se creo el Hotel`,
            body: newHotel,
        };

        return res.status(201).json(response);
    }

    async edit(req: ex.Request, res: ex.Response){
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
            title: "Hotel editado correctamente",
            message: `Se editó el hotel.`,
            body: null,
        };

        return res.status(200).json(response);
    }

    async updateStatus(req: ex.Request, res: ex.Response){
        const id = req.query.id;

        if(!id) throw new ValidationError("La query id es Necesario");
        
        const hotel = await ServiceContainer.hotel.updatedStatus.handler({
            id: id.toString(),
        });

        const response: ApiResponse<any> = {
            success: true,
            title: "Hotel bloqueado",
            message: "Eliminacion temporal en estado bloqueado",
            body: hotel
    };

    return res.status(200).json(response);
    }

    async getAllByPlan(req: ex.Request, res: ex.Response){
        const plan = req.query.plan;
        const page = req.query.page;
        const limit = req.query.limit;

        if(!plan) throw new ValidationError("La query plan es necesaria");

        const hotel = await ServiceContainer.hotel.getByPlan.handler({
            plan: plan.toString(),
            page: page ? Number(page.toString()) : undefined,
            limit: limit ? Number(limit.toString()) : undefined,            
        });

        const response: ApiResponse<any[]> = {
            success: true,
            title: "Hotel",
            message: "Se listan todos los hoteles por plan",
            body: hotel,
        };

        return res.status(200).json(response);
    }


    async getAllByRole(req: ex.Request, res: ex.Response){
        const role = req.query.role;
        const page = req.query.page;
        const limit = req.query.limit;

        if(!role) throw new ValidationError("La query role es necesaria");

        const hotel = await ServiceContainer.hotel.getByRole.handler({
            role: role.toString(),
            page: page ? Number(page.toString()) : undefined,
            limit: limit ? Number(limit.toString()) : undefined,            
        });

        const response: ApiResponse<any[]> = {
            success: true,
            title: "Hotel",
            message: "Se listan todos los hoteles por roles correctamente",
            body: hotel,
        };

        return res.status(200).json(response);
    }

    async getAllByStatus(req: ex.Request, res: ex.Response){
        const status = req.query.status;
        const page = req.query.page;
        const limit = req.query.limit;

        if(!status) throw new ValidationError("La query role es necesaria");

        const hotel = await ServiceContainer.hotel.getByStatus.handler({
            status: status.toString(),
            page: page ? Number(page.toString()) : undefined,
            limit: limit ? Number(limit.toString()) : undefined,            
        });

        const response: ApiResponse<any[]> = {
            success: true,
            title: "Hotel",
            message: "Se listan todos los hoteles por status correctamente",
            body: hotel,
        };

        return res.status(200).json(response);
    }

    async getAllByProvider(req: ex.Request, res: ex.Response){
        const provider = req.query.provider;
        const page = req.query.page;
        const limit = req.query.limit;

        if(!provider) throw new ValidationError("La query role es necesaria");

        const hotel = await ServiceContainer.hotel.getByProvider.handler({
            providerData: provider.toString(),
            page: page ? Number(page.toString()) : undefined,
            limit: limit ? Number(limit.toString()) : undefined,            
        });

        const response: ApiResponse<any[]> = {
            success: true,
            title: "Hotel",
            message: "Se listan todos los hoteles por proveedor correctamente",
            body: hotel,
        };

        return res.status(200).json(response);
    }

    async findExpireddFreePlans(req: ex.Request, res: ex.Response){
        const {now, id} = req.query

        if(!id || !now) throw new ValidationError("Se necesita las 2 queries now=fecha de expiración y el id del usuario afectado");

        const dateNow = new Date(now as string);
        const hotelId = new HotelId(id as string);

        const hotelExpired = await ServiceContainer.hotel.FindExpiredPlans.handler({
            id: hotelId.toString(),
            now: dateNow
        });

        const response: ApiResponse<any[]> = {
            success: true,
            title: "Hotel",
            message: "Se listan todos los hoteles por proveedor correctamente",
            body: hotelExpired,
        };

        return res.status(200).json(response);
        
    }
}