import {
  ConfirmReservationDTO,
  ConfirmReservationUseCase,
} from '~/lib/reservation/application';
import { ApiResponse, express as ex } from '~/lib/shared/infrastructure';

export class ConfirmReservationController {
  constructor(
    private readonly confirmReservationUseCase: ConfirmReservationUseCase,
  ) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as ConfirmReservationDTO;

    await this.confirmReservationUseCase.execute(body);

    const response: ApiResponse<null> = {
      success: true,
      title: 'Reservation successfully confirmed.',
      message: `Reservation with ID ${body.reservationId} has been confirmed.`,
      body: null,
    };

    return res.status(200).json(response);
  }
}
