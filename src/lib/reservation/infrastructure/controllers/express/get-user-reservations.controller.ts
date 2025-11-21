import {
  GetUserReservationsDTO,
  GetUserReservationsUseCase,
} from '~/lib/reservation/application';
import { ReservationResponse } from '~/lib/reservation/domain';
import { HttpError } from '~/lib/shared/domain';
import { ApiResponse } from '~/lib/shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/shared/Infraestructure/External';

export class GetUserReservationsController {
  constructor(
    private readonly getUserReservationsUseCase: GetUserReservationsUseCase,
  ) {}

  async handle(req: ex.Request, res: ex.Response) {
    const query = req.query as Partial<GetUserReservationsDTO>;

    if (!query.userId) throw new HttpError('"userId" is required.', 400);

    const result = await this.getUserReservationsUseCase.execute({
      userId: query.userId,
    });

    const response: ApiResponse<ReservationResponse[]> = {
      success: true,
      title: 'User reservations retrieved successfully.',
      message: `${result.length} reservation(s) found for user ID ${query.userId}.`,
      body: result,
    };

    return res.status(200).json(response);
  }
}
