import { ApiResponse } from "~/lib/Shared/Infraestructure/ApiResponse";
import { express as ex } from "../../../Shared/Infraestructure/External";
import { ServiceContainer } from "../../../Shared/Infraestructure/ServiceContainer";
import { ValidationError } from "../../../../lib/Shared/domain";


export class ExpressUserController {
  async create(req: ex.Request, res: ex.Response) {
    const {name, email, password} =  req.body  as {
      name: string;
      email: string;
      password: string;         
    };

    const newUser = await ServiceContainer.user.create.handler({
      name,
      email,
      password,     
      
    });

    const response: ApiResponse<typeof newUser> = {
      success: true,
      title: "Usuario creado correctamente",
      message: `Se creo el usuario ${name}`,
      body: newUser,
    };

    return res.status(201).json(response);
  }

  async getOneById(req: ex.Request, res: ex.Response) {
    const id = req.query.id;

    if(!id) throw new ValidationError("La query id es necesario");

    const user = await ServiceContainer.user.getOneById.handler({
      id: id.toString(),
    });

    const response: ApiResponse<any> = {
      success: true,
      title: "Usuario",
      message: "Se retorna un usuario dado un id",
      body: user
    };

    return res.status(201).json(response);
  }

  async getAll(req: ex.Request, res: ex.Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

  const users = await ServiceContainer.user.getAll.handler({
    page,
    limit,
  });
    const response: ApiResponse<any[]> = {
      success: true,
      title: "Usuarios",
      message: "Se listan todos los usuarios",
      body: users
    }

    return res.status(200).json(response)
  }

  async getOneByEmail(req: ex.Request, res: ex.Response) {
    const email = req.query.email;

    if(!email) throw new ValidationError("La query email es necesaria");

    const user = await ServiceContainer.user.getOneByEmail.handler({
      email: email.toString(),
    });


    const response: ApiResponse<any> ={
      success: true,
      title: "user",
      message: "Se retorna el negocio dado un email",
      body: user
      
    };

    return res.status(201).json(response);
  }

  async edit(req: ex.Request, res: ex.Response) {
    const user = req.body as {
      userId: string;
      name?: string;
      password?: string;
      picture?: string;
      score?: number;
      status?: boolean;
      currentRole?: string;
    };

    await ServiceContainer.user.edit.handler(user);

    const response: ApiResponse<null> = {
      success: true,
      title: "Usuario editado correctamente",
      message: `Se edito el usuario ${name}`,
      body: null,

    };

    return res.status(200).json(response)
  }

  async softDelete(req: ex.Request, res: ex.Response) {
    const id = req.body.id;

    if(!id) throw new ValidationError("La query id es necesario");

    const user = await ServiceContainer.user.softDelete.handler({
      id: id.toString(),
    });

    const response: ApiResponse<any> = {
      success: true,
      title: "Usuario bloqueado",
      message: `Eliminacion temporal en estado bloqueado del usuario ${name}`,
      body: user,
    };

    return res.status(200).json(response)
  }
}
