import { express as ex } from "./../../Shared/Infraestructure/External";
import { ServiceContainer } from "../../Shared/Infraestructure/ServiceContainer";
import { UserNotFoundError } from "../domain/UserNotFoundError";
import { ApiResponse, ResponseHelper } from "./ApiResponse";


export class ExpressUserController {

  async getAll(req: ex.Request, res: ex.Response){
    try {
       const users = await ServiceContainer.user.getAll.handle();     

       const safeUser = users.map(({password, ...rest}) => rest);

       //respuesta json

       const response: ApiResponse<any> = {
        success: true,
        title: 'usuarios encontrados',
        message: 'Listado de usuarios',
        body: safeUser
       }
    return res.status(200).json(response)
      
    } catch (error) {     

       return res.status(500).json({ message: "Error retrieving users" });
    }
   
  }
    
   
  
  async getOneById(req: ex.Request, res: ex.Response, next: ex.NextFunction) {
    try {
      const users = await ServiceContainer.user.getOneById.handle(req.params.id);
      const {password, ...safeUser} = users.mapToPrimitives();

       const response: ApiResponse<any> = {
        success: true,
        title: 'usuario encontrado',
        message: 'El usuario fue encontrado correctamente',
        body: safeUser
      }

      return res.status(200).json(response);
    } catch (error) {
      if (error instanceof UserNotFoundError) {

        const response: ApiResponse<null> = {
          success: false,
          title: 'usuario no encontrado',
          message: error.message,
          body: null
        }



        return res.status(404).json(response);
      } 

      next(error);
    }
  }

  async create(req: ex.Request, res: ex.Response, next: ex.NextFunction) {
    try {
      
      const { createdAt, email, id, name, password, role } = req.body as {
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        password: string;
        role: 'CLIENT' | 'HOTEL' | 'BUSINESS' | 'ADMIN'
      };
      await ServiceContainer.user.create.handler(
          id,
          name,
          email,
          password,
          new Date(createdAt),
          role
      );

      const response: ApiResponse<null> = {
        success: true,
        title: 'Usuario creado',
        message: `El usuario ${name} fue creado correctamente`,
        body: null
      }

      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async edit(req: ex.Request, res: ex.Response, next: ex.NextFunction) {
    try {
      const { createdAt, email, id, name, password } = req.body as {
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        password: string
      };
      
      const updatedUser = await ServiceContainer.user.edit.handle(
        id,
        name,
        email,
        new Date(createdAt),
        password
      );

      const { password: _, ...safeUser } = updatedUser.mapToPrimitives();

      const response = ResponseHelper.success(
        'Usuario actualizado',
        `El usuario ${name} fue actualizado correctamente`,
        safeUser
);

      return res.status(200).json(response)
    } catch (error) {
      if (error instanceof UserNotFoundError) {
         const response: ApiResponse<null> = {
          success: false,
          title: 'Usuario no encontrado',
          message: error.message,
          body: null
        };

        
        return res.status(404).json(response);
      }

      next(error);
    }
  }

  async delete(req: ex.Request, res: ex.Response, next: ex.NextFunction) {
    try {
      await ServiceContainer.user.delete.handle(req.params.id);

        const response: ApiResponse<null> = {
        success: true,
        title: 'Usuario Eliminado',
        message: `El ususario fue eliminado correctamente`,
        body: null
      }

      return res.status(200).json(response);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
       const response: ApiResponse<null> = {
          success: false,
          title: 'Usuario no encontrado',
          message: error.message,
          body: null
        };
        return res.status(404).json(response);
      }

      next(error);
    }
  }


}