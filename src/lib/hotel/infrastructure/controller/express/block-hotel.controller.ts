import {
  BlockHotelDTO,
  BlockHotelUseCase,
} from '~/lib/hotel/application/use-cases';
import { ApiResponse } from '~/lib/Shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/Shared/Infraestructure/External';

export class BlockHotelController {
  constructor(private readonly blockHotelUseCase: BlockHotelUseCase) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as BlockHotelDTO;

    await this.blockHotelUseCase.execute(body);

    const response: ApiResponse<null> = {
      success: true,
      title: 'Hotel blocked successfully',
      message: `Hotel ${body.id} has been blocked.`,
      body: null,
    };

    return res.status(200).json(response);
  }
}
