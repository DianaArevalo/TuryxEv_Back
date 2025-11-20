import {
  CheckHotelFreePlansDTO,
  CheckHotelFreePlansUseCase,
} from '~/lib/hotel/application/use-cases';
import { ApiResponse } from '~/lib/Shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/Shared/Infraestructure/External';

export class CheckHotelFreePlansController {
  constructor(
    private readonly checkHotelFreePlansUseCase: CheckHotelFreePlansUseCase,
  ) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as CheckHotelFreePlansDTO;

    await this.checkHotelFreePlansUseCase.execute(body);

    const response: ApiResponse<null> = {
      success: true,
      title: 'Verification completed.',
      message: `Hotels with an expired FREE plan were updated to BLOCKED status when applicable.`,
      body: null,
    };

    return res.status(200).json(response);
  }
}
