import {
  GetHotelsDTO,
  GetHotelsUseCase,
} from '~/lib/hotel/application/use-cases';
import { HotelResponse } from '~/lib/hotel/domain';
import { ApiResponse } from '~/lib/Shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/Shared/Infraestructure/External';

export class GetHotelsController {
  constructor(private readonly getHotelsUseCase: GetHotelsUseCase) {}

  async handle(req: ex.Request, res: ex.Response) {
    const query = req.query as GetHotelsDTO;

    const result = await this.getHotelsUseCase.execute(query);

    const response: ApiResponse<HotelResponse[]> = {
      success: true,
      title: 'Hotels retrieved successfully.',
      message: `${result.length} hotel(s) found.`,
      body: result,
    };

    return res.status(200).json(response);
  }
}
