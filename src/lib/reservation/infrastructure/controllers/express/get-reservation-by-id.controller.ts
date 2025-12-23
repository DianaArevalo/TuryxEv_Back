import {
  GetReservationByIdDTO,
  GetReservationByIdUseCase,
} from '~/lib/reservation/application';
import { ReservationResponse } from '~/lib/reservation/domain';
import { HttpError } from '~/lib/Shared/domain';
import { ApiResponse } from '~/lib/Shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/Shared/Infraestructure/External';

export class GetReservationByIdController {
  constructor(
    private readonly getReservationByIdUseCase: GetReservationByIdUseCase,
  ) {}

  async handle(req: ex.Request, res: ex.Response) {
    const query = req.query as Partial<GetReservationByIdDTO>;

    if (!query.reservationId)
      throw new HttpError('"reservationId" is required.', 400);

    const result = await this.getReservationByIdUseCase.execute({
      reservationId: query.reservationId,
    });

    const response: ApiResponse<ReservationResponse> = {
      success: true,
      title: 'Reservation retrieved successfully.',
      message: `Reservation with ID ${query.reservationId} retrieved successfully.`,
      body: result,
    };

    return res.status(200).json(response);
  }
}
