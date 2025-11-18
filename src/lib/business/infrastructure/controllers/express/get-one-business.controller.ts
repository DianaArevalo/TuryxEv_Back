import {
  GetOneBusinessDTO,
  GetOneBusinessUseCase,
} from '~/lib/business/application';
import { BusinessPublicResponse } from '~/lib/business/domain';
import { ApiResponse } from '~/lib/Shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/Shared/Infraestructure/External';

export class GetOneBusinessController {
  constructor(private readonly getOneBusinessUseCase: GetOneBusinessUseCase) {}

  async handle(req: ex.Request, res: ex.Response) {
    const query = req.query as GetOneBusinessDTO;

    const business = await this.getOneBusinessUseCase.execute(query);

    const response: ApiResponse<BusinessPublicResponse> = {
      success: true,
      title: 'Business retrieved',
      message: `A business were successfully retrieved.`,
      body: business,
    };

    res.status(200).json(response);
  }
}
