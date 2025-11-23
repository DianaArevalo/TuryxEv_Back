import {
  CreateBusinessDTO,
  CreateBusinessUseCase,
} from '~/lib/business/application';
import { BusinessPrivateResponse } from '~/lib/business/domain';
import { ApiResponse, express as ex } from '~/lib/shared/infrastructure';

export class CreateBusinessController {
  constructor(private readonly createBusinessUseCase: CreateBusinessUseCase) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as CreateBusinessDTO;
    const business = await this.createBusinessUseCase.execute(body);

    const response: ApiResponse<BusinessPrivateResponse> = {
      success: true,
      title: 'Business created',
      message: `Business '${business.name}' created.`,
      body: business,
    };

    res.status(201).json(response);
  }
}
