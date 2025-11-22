import {
  EditLocationDTO,
  EditLocationUseCase,
} from '~/lib/location/application';
import { ApiResponse, express as ex } from '~/lib/shared/infrastructure';

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
