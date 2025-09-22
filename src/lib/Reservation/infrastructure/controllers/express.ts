import { ServiceContainer } from "../../../Shared/Infraestructure/ServiceContainer";
import { express as ex } from "../../../Shared/Infraestructure/External";
import { ApiResponse } from "../../../Shared/Infraestructure/ApiResponse";
import { ReservationNotFoundError } from "../../../Reservation/domain";

export class ExpressReservationController {
  async getOneByReservationId(
    req: ex.Request,
    res: ex.Response,
    next: ex.NextFunction
  ) {
    try {
      const reservation =
        await ServiceContainer.reservation.getOneByReservationId.handler({
          reservationId: req.params.reservationId,
        });

      if (!reservation) {
        const response: ApiResponse<null> = {
          success: false,
          title: "Reserva no encontrada",
          message: `No se encontro la reserva con id ${req.params.reservationId}`,
          body: null,
        };

        return res.status(404).json(response);
      }

      const response: ApiResponse<any> = {
        success: true,
        title: "Reservacion encontrada",
        message: `Reserva ${req.params.reservationId} encontrada`,
        body: reservation,
      };

      return res.status(200).json(response);
    } catch (error) {
      if (error instanceof ReservationNotFoundError) {
        const response: ApiResponse<null> = {
          success: false,
          title: "Ocurrio un error",
          message: error.message,
          body: null,
        };

        return res.status(error.statusCode).json(response);
      }

      next(error);
    }
  }

  async getAllUserReservations(
    req: ex.Request,
    res: ex.Response,
    next: ex.NextFunction
  ) {
    try {
      const reservations =
        await ServiceContainer.reservation.getUserReservations.handler({
          userId: req.params.id,
        });

      const response: ApiResponse<any[]> = {
        success: true,
        title: "Reservaciones de usuario",
        message: "Se listan todas las reservas del usuario correctamente",
        body: reservations.map((reservation) => reservation.toResponse()),
      };

      return res.status(200).json(response);
    } catch (error) {
      if (error instanceof ReservationNotFoundError) {
        const response: ApiResponse<null> = {
          success: false,
          title: "Ocurrio un error",
          message: error.message,
          body: null,
        };

        return res.status(error.statusCode).json(response);
      }

      next(error);
    }
  }

  async getAllByHotelId(
    req: ex.Request,
    res: ex.Response,
    next: ex.NextFunction
  ) {
    try {
      const reservations =
        await ServiceContainer.reservation.getAllByHotelId.handler({
          hotelId: req.params.id,
        });

      const response: ApiResponse<any[]> = {
        success: true,
        title: "Reservas del hotel",
        message: "Se listan todas las reservas del hotel",
        body: reservations.map((reservation) => reservation.toResponse()),
      };

      return res.status(200).json(response);
    } catch (error) {
      if (error instanceof ReservationNotFoundError) {
        const response: ApiResponse<null> = {
          success: false,
          title: "Ocurrio un error",
          message: error.message,
          body: null,
        };

        return res.status(error.statusCode).json(response);
      }

      next(error);
    }
  }

  async create(req: ex.Request, res: ex.Response, next: ex.NextFunction) {
    try {
      const body = req.body as {
        userId: string;
        hotelId: string;
        checkInDate: Date;
        checkOutDate: Date;
      };

      await ServiceContainer.reservation.create.handler(body);

      const response: ApiResponse<null> = {
        success: true,
        title: "Reserva creada correctamente",
        message: `Se creo la reserva.`,
        body: null,
      };

      return res.status(201).json(response);
    } catch (error) {
      if (error instanceof ReservationNotFoundError) {
        const response: ApiResponse<null> = {
          success: false,
          title: "Ocurrio un error",
          message: error.message,
          body: null,
        };

        return res.status(error.statusCode).json(response);
      }

      next(error);
    }
  }

  async edit(req: ex.Request, res: ex.Response, next: ex.NextFunction) {
    try {
      const body = req.body as {
        reservationId: string;
        checkInDate?: Date;
        checkOutDate?: Date;
      };

      await ServiceContainer.reservation.edit.handler(body);

      const response: ApiResponse<null> = {
        success: true,
        title: "Reserva editada correctamente",
        message: `Se edito la reserva.`,
        body: null,
      };

      return res.status(200).json(response);
    } catch (error) {
      if (error instanceof ReservationNotFoundError) {
        const response: ApiResponse<null> = {
          success: false,
          title: "Ocurrio un error",
          message: error.message,
          body: null,
        };

        return res.status(error.statusCode).json(response);
      }

      next(error);
    }
  }

  async confirm(req: ex.Request, res: ex.Response, next: ex.NextFunction) {
    try {
      const body = req.body as {
        reservationId: string;
        paymentId: string;
      };

      await ServiceContainer.reservation.confirm.handler(body);

      const response: ApiResponse<null> = {
        success: true,
        title: "Reserva confirmada correctamente",
        message: `Se confirmó la reserva.`,
        body: null,
      };

      return res.status(200).json(response);
    } catch (error) {
      if (error instanceof ReservationNotFoundError) {
        const response: ApiResponse<null> = {
          success: false,
          title: "Ocurrio un error",
          message: error.message,
          body: null,
        };

        return res.status(error.statusCode).json(response);
      }

      next(error);
    }
  }

  async cancel(req: ex.Request, res: ex.Response, next: ex.NextFunction) {
    try {
      const { reservationId } = req.body as { reservationId: string };

      await ServiceContainer.reservation.cancel.handler({
        reservationId: reservationId,
      });

      const response: ApiResponse<null> = {
        success: true,
        title: "Reserva cancelada correctamente",
        message: `Se cancelo la reserva con id ${reservationId}.`,
        body: null,
      };

      return res.status(200).json(response);
    } catch (error) {
      if (error instanceof ReservationNotFoundError) {
        const response: ApiResponse<null> = {
          success: false,
          title: "Ocurrio un error",
          message: error.message,
          body: null,
        };

        return res.status(error.statusCode).json(response);
      }

      next(error);
    }
  }
}
