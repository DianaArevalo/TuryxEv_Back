import {
  GetReservationsByHotelIdDTO,
  GetReservationsByHotelIdUseCase,
} from '~/lib/reservation/application';
import { ReservationResponse } from '~/lib/reservation/domain';
import { HttpError } from '~/lib/shared/domain';
import { ApiResponse, express as ex } from '~/lib/shared/infrastructure';

export class GetReservationsByHotelIdController {
  constructor(
    private readonly getReservationsByHotelIdUseCase: GetReservationsByHotelIdUseCase,
  ) {}

  async handle(req: ex.Request, res: ex.Response) {
    const query = req.query as Partial<GetReservationsByHotelIdDTO>;

    if (!query.hotelId) throw new HttpError('"hotelId" is required.', 400);

    const result = await this.getReservationsByHotelIdUseCase.execute({
      hotelId: query.hotelId,
    });

    const response: ApiResponse<ReservationResponse[]> = {
      success: true,
      title: 'Reservations retrieved successfully.',
      message: `${result.length} reservation(s) found for hotel ID ${query.hotelId}.`,
      body: result,
    };

    return res.status(200).json(response);
  }
}
