import {
  CreateHotelDTO,
  CreateHotelUseCase,
} from '~/lib/hotel/application/use-cases';
import { HotelResponse } from '~/lib/hotel/domain';
import { ApiResponse } from '~/lib/Shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/Shared/Infraestructure/External';

export class CreateHotelController {
  constructor(private readonly createHotelUseCase: CreateHotelUseCase) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as CreateHotelDTO;

    const result = await this.createHotelUseCase.execute(body);

    const response: ApiResponse<HotelResponse> = {
      success: true,
      title: 'Hotel created successfully.',
      message: `Hotel "${result.name}" has been created.`,
      body: result,
    };

    return res.status(200).json(response);
  }
}
