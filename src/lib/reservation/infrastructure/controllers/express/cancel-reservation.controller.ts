import {
  CancelReservationDTO,
  CancelReservationUseCase,
} from '~/lib/reservation/application';
import { ApiResponse } from '~/lib/shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/shared/Infraestructure/External';

export class CancelReservationController {
  constructor(
    private readonly cancelReservationUseCase: CancelReservationUseCase,
  ) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as CancelReservationDTO;

    await this.cancelReservationUseCase.execute(body);

    const response: ApiResponse<null> = {
      success: true,
      title: 'Reservation successfully cancelled.',
      message: `Reservation with ID ${body.reservationId} has been cancelled.`,
      body: null,
    };

    return res.status(200).json(response);
  }
}
