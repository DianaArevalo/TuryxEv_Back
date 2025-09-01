import { ServiceContainer } from "../../Shared/Infraestructure/ServiceContainer";
import { NextFunction, Request, Response } from "express";
import { UserNotFoundError } from "../domain/UserNotFoundError";
import { json } from "stream/consumers";

export class ExpressUserController {

  async getAll(req: Request, res: Response){
    try {
       const users = await ServiceContainer.user.getAll.handle();     

       const safeUser = users.map(({password, ...rest}) => rest)
    return res.status(200).json(safeUser)
      
    } catch (error) {
       return res.status(500).json({ message: "Error retrieving users" });
    }
   
  }
    
   
  
  async getOneById(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await ServiceContainer.user.getOneById.handle(req.params.id);
      const {password, ...safeUser} = users.mapToPrimitives();

      return res.status(200).json(safeUser);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(404).json({ message: error.message });
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

      return res.status(201).send();
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
      
      const updatedUser = await ServiceContainer.user.edit.handle(
        id,
        name,
        email,
        new Date(createdAt),
        password
      );

      return res.status(204).json({
        message: "Usuario actualizado correctamente",
        data: updatedUser
      })
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(404).json({ message: error.message });
      }

      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await ServiceContainer.user.delete.handle(req.params.id);

      return res.status(204).send();
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(404).json({ message: error.message });
      }

      next(error);
    }
  }


}