import { ServiceContainer } from "../../Shared/Infraestructure/ServiceContainer";
import { NextFunction, Request, Response } from "express";
import { UserNotFoundError } from "../domain/UserNotFoundError";
import { ApiResponse } from "./ApiResponse";

export class ExpressUserController {


    async getOneById(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await ServiceContainer.user.getOneById.handle(req.params.id);

      const response: ApiResponse<any> = {
        success: true,
        title: 'usuario encontrado',
        message: 'El usuario fue encontrado correctamente',
        body: users.mapToPrimitives()
      }
      return res.json(response).status(200);
    } catch (error) {
      if (error instanceof UserNotFoundError) {

        const response: ApiResponse<null> = {
          success: false,
          title: 'Usuario no encontrado',
          message: error.message,
          body:null
        };
        return res.status(404).json(response);
      }

      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
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

  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const { createdAt, email, id, name, password } = req.body as {
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        password: string
      };
      await ServiceContainer.user.edit.handle(
        id,
        name,
        email,
        new Date(createdAt),
        password
      );

      const response: ApiResponse<null> = {
        success: true,
        title: 'Usuario actualizado',
        message: `El ususario ${name} fue actualizado correctamente`,
        body: null
      }

      return res.status(204).json(response);
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

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await ServiceContainer.user.delete.handle(req.params.id);

        const response: ApiResponse<null> = {
        success: true,
        title: 'Usuario actualizado',
        message: `El ususario ${name} fue actualizado correctamente`,
        body: null
      }

      return res.status(204).json(response);
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