import {
  SoftDeleteBusinessDTO,
  SoftDeleteBusinessUseCase,
} from '~/lib/business/application';
import { ApiResponse } from '~/lib/shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/shared/Infraestructure/External';

export class SoftDeleteBusinessController {
  constructor(private readonly softDeleteUseCase: SoftDeleteBusinessUseCase) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as SoftDeleteBusinessDTO;

    await this.softDeleteUseCase.execute(body);

    const response: ApiResponse<null> = {
      success: true,
      title: 'Business deleted',
      message: `A business were successfully deleted.`,
      body: null,
    };

    res.status(200).json(response);
  }
}
