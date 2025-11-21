import {
  EditLocationDTO,
  EditLocationUseCase,
} from '~/lib/location/application/use-cases';
import { ApiResponse } from '~/lib/shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/shared/Infraestructure/External';

export class EditLocationController {
  constructor(private readonly updateLocationUseCase: EditLocationUseCase) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as EditLocationDTO;
    await this.updateLocationUseCase.execute(body);

    const response: ApiResponse<null> = {
      success: true,
      title: 'Location updated.',
      message: `Location updated successfully.`,
    };

    res.status(20).json(response);
  }
}
