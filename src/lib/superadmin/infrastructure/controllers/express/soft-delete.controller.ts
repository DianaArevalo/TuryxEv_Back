import { ApiResponse } from '~/lib/shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/shared/Infraestructure/External';
import {
  SoftDeleteSuperAdminDTO,
  SoftDeleteSuperAdminUseCase,
} from '~/lib/superadmin/application';

export class SoftDeleteSuperAdminController {
  constructor(
    private readonly softDeleteSuperAdminUseCase: SoftDeleteSuperAdminUseCase,
  ) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as SoftDeleteSuperAdminDTO;

    await this.softDeleteSuperAdminUseCase.execute(body);

    const response: ApiResponse<null> = {
      success: true,
      title: 'Superadmin deleted',
      message: `A superadmin were successfully deleted.`,
      body: null,
    };

    return res.status(200).json(response);
  }
}
