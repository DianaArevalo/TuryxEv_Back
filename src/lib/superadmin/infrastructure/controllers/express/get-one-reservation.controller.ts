import { ReservationResponse } from '~/lib/reservation/domain';
import { HttpError } from '~/lib/shared/domain';
import { ApiResponse, express as ex } from '~/lib/shared/infrastructure';
import { SuperAdminReservationServicePort } from '~/lib/superadmin/domain';

export class SuperAdminGetOneReservationController {
  constructor(
    private readonly reservationService: SuperAdminReservationServicePort,
  ) {}

  async handle(req: ex.Request, res: ex.Response) {
    const query = req.query as { reservationId?: string };

    if (!query.reservationId)
      throw new HttpError("'reservationId' is required.", 400);

    const result = await this.reservationService.getReservationById(
      query.reservationId,
    );

    const response: ApiResponse<ReservationResponse> = {
      success: true,
      title: 'Reservation retrieved',
      message: `A reservation were successfully retrieved.`,
      body: result,
    };

    return res.status(200).json(response);
  }
}
