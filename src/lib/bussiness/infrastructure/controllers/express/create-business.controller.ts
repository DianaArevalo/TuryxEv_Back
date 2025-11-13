import {
  CreateBusinessDTO,
  CreateBusinessUseCase,
} from '~/lib/bussiness/application';
import { BusinessPrivateResponse } from '~/lib/bussiness/domain';
import { ApiResponse } from '~/lib/Shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/Shared/Infraestructure/External';

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
