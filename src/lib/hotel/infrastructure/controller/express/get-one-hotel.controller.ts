import { GetOneHotelDTO, GetOneHotelUseCase } from '~/lib/hotel/application';
import { HotelResponse } from '~/lib/hotel/domain';
import { ApiResponse } from '~/lib/shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/shared/Infraestructure/External';

export class GetOneHotelController {
  constructor(private readonly getOneHotelUseCase: GetOneHotelUseCase) {}

  async handle(req: ex.Request, res: ex.Response) {
    const query = req.query as GetOneHotelDTO;

    const result = await this.getOneHotelUseCase.execute(query);

    const response: ApiResponse<HotelResponse> = {
      success: true,
      title: 'Hotel retrieved successfully.',
      message: `Hotel ${result.id} information loaded.`,
      body: result,
    };

    return res.status(200).json(response);
  }
}
