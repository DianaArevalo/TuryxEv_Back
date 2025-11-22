import { ApiResponse, express as ex } from '~/lib/shared/infrastructure';
import {
  GetOneSuperAdminDTO,
  GetOneSuperAdminUseCase,
} from '~/lib/superadmin/application';
import { SuperAdminResponse } from '~/lib/superadmin/domain';

export class GetOneSuperAdminController {
  constructor(
    private readonly getOneSuperAdminUseCase: GetOneSuperAdminUseCase,
  ) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.query as GetOneSuperAdminDTO;

    const result = await this.getOneSuperAdminUseCase.execute(body);

    const response: ApiResponse<SuperAdminResponse> = {
      success: true,
      title: 'Superadmin retrieved',
      message: `A superadmin were successfully retrieved.`,
      body: result,
    };

    return res.status(200).json(response);
  }
}
