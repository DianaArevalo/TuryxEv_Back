import {
  UpdatelocationDTO,
  UpdateLocationUseCase,
} from '~/lib/location/application/use-cases';
import { ApiResponse } from '~/lib/Shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/Shared/Infraestructure/External';

export class UpdateLocationController {
  constructor(private readonly updateLocationUseCase: UpdateLocationUseCase) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as UpdatelocationDTO;
    await this.updateLocationUseCase.execute(body);

    const response: ApiResponse<null> = {
      success: true,
      title: 'Location updated.',
      message: `Location updated successfully.`,
    };

    res.status(20).json(response);
  }
}
