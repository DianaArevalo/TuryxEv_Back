import {
  GetBusinessesDTO,
  GetBusinessesUseCase,
} from '~/lib/bussiness/application';
import { BusinessPublicResponse } from '~/lib/bussiness/domain';
import { ApiResponse } from '~/lib/Shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/Shared/Infraestructure/External';

export class GetBusinessesController {
  constructor(private readonly getBusinessesUseCase: GetBusinessesUseCase) {}

  async handle(req: ex.Request, res: ex.Response) {
    const query = req.query as GetBusinessesDTO;

    const businesses = await this.getBusinessesUseCase.execute(query);

    const response: ApiResponse<BusinessPublicResponse[]> = {
      success: true,
      title: 'Businesses retrieved',
      message: `A total of ${businesses.length} businesses were successfully retrieved.`,
      body: businesses,
    };

    res.status(200).json(response);
  }
}
