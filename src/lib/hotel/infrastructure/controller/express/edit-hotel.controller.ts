import {
  EditHotelDTO,
  EditHotelUseCase,
} from '~/lib/hotel/application/use-cases';
import { HotelResponse } from '~/lib/hotel/domain';
import { ApiResponse } from '~/lib/shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/shared/Infraestructure/External';

export class EditHotelController {
  constructor(private readonly editHotelUseCase: EditHotelUseCase) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as EditHotelDTO;

    const result = await this.editHotelUseCase.execute(body);

    const response: ApiResponse<HotelResponse> = {
      success: true,
      title: 'Hotel edited successfully.',
      message: `Hotel "${result.name}" has been edited.`,
      body: result,
    };

    return res.status(200).json(response);
  }
}
