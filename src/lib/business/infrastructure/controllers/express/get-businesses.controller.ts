import {
  GetBusinessesDTO,
  GetBusinessesUseCase,
} from '~/lib/business/application';
import { BusinessPublicResponse } from '~/lib/business/domain';
import { ApiResponse, express as ex } from '~/lib/shared/infrastructure';

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
