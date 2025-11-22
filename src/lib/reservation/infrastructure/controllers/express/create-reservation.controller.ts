import {
  CreateReservationDTO,
  CreateReservationUseCase,
} from '~/lib/reservation/application';
import { ReservationResponse } from '~/lib/reservation/domain';
import { ApiResponse, express as ex } from '~/lib/shared/infrastructure';

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

    return res.status(201).json(response);
  }
}
