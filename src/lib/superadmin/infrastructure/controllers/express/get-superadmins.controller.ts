import { ApiResponse, express as ex } from '~/lib/shared/infrastructure';
import {
  GetSuperAdminsDTO,
  GetSuperAdminsUseCase,
} from '~/lib/superadmin/application';
import { SuperAdminResponse } from '~/lib/superadmin/domain';

export class GetSuperAdminsController {
  constructor(private readonly getSuperAdminsUseCase: GetSuperAdminsUseCase) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.query as GetSuperAdminsDTO;

    const result = await this.getSuperAdminsUseCase.execute(body);

    const response: ApiResponse<SuperAdminResponse[]> = {
      success: true,
      title: 'Superadmins retrieved',
      message: `A total of ${result.length} superadmins were successfully retrieved.`,
      body: result,
    };

    return res.status(200).json(response);
  }
}
