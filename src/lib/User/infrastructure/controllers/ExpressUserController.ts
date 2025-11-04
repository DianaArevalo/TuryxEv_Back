import { ApiResponse } from "~/lib/Shared/Infraestructure/ApiResponse";
import { express as ex } from "../../../Shared/Infraestructure/External";
import { ServiceContainer } from "../../../Shared/Infraestructure/ServiceContainer";
import { UserNotFoundError } from "../../domain/exceptions/UserNotFoundError";
import { User } from "../../domain/entities/User/User";

export class ExpressUserController {
  async create(req: ex.Request, res: ex.Response) {
    const {name, email, password} =  req.body  as {
      name: string;
      email: string;
      password: string;
      picture?: string;
      status?: Number;   
    };

    const newUser = await ServiceContainer.user.create.handler({
      name,
      email,
      password,      
      plan: "FREE",
      role: "USER",
      score: 5,
      providerData: "AUTH"
    });

    const response: ApiResponse<typeof newUser> = {
      success: true,
      title: "Usuario creado correctamente",
      message: `Se creo el usuario ${name}`,
      body: newUser,
    };

    return res.status(201).json(response);
  }

  async getOneById(req: ex.Request, res: ex.Response) {}

  async getAll(req: ex.Request, res: ex.Response) {}

  async getOneByEmail(req: ex.Request, res: ex.Response) {}

  async edit(req: ex.Request, res: ex.Response) {}

  async softDelete(req: ex.Request, res: ex.Response) {}
}
