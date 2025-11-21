import {
  CreateReservationDTO,
  CreateReservationUseCase,
} from '~/lib/reservation/application';
import { ReservationResponse } from '~/lib/reservation/domain';
import { ApiResponse } from '~/lib/shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/shared/Infraestructure/External';

export class CreateReservationController {
  constructor(
    private readonly createReservationUseCase: CreateReservationUseCase,
  ) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as CreateReservationDTO;

    const result = await this.createReservationUseCase.execute(body);

    const response: ApiResponse<ReservationResponse> = {
      success: true,
      title: 'Reservation successfully created.',
      message: `Reservation with ID ${result.reservationId} has been created.`,
      body: result,
    };

    return res.status(200).json(response);
  }
}
