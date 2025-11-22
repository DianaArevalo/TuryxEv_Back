import { ReservationResponse } from '~/lib/reservation/domain';
import { ApiResponse, express as ex } from '~/lib/shared/infrastructure';
import {
  FilterReservationsProps,
  SuperAdminReservationServicePort,
} from '~/lib/superadmin/domain';

export class SuperAdminGetReservationsController {
  constructor(
    private readonly reservationService: SuperAdminReservationServicePort,
  ) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as FilterReservationsProps;

    const result = await this.reservationService.filterReservations(body);

    const response: ApiResponse<ReservationResponse[]> = {
      success: true,
      title: 'Reservations retrieved',
      message: `A total of ${result.length} reservations were successfully retrieved.`,
      body: result,
    };

    return res.status(200).json(response);
  }
}
