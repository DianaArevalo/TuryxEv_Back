import { ApiResponse } from '~/lib/shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/shared/Infraestructure/External';
import {
  EditSuperAdminDTO,
  EditSuperAdminUseCase,
} from '~/lib/superadmin/application';
import { SuperAdminResponse } from '~/lib/superadmin/domain';

export class EditSuperAdminController {
  constructor(private readonly editSuperAdminUseCase: EditSuperAdminUseCase) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as EditSuperAdminDTO;

    const result = await this.editSuperAdminUseCase.execute(body);

    const response: ApiResponse<SuperAdminResponse> = {
      success: true,
      title: 'Superadmin edited',
      message: `Superadmin '${result.name}' edited`,
      body: result,
    };

    return res.status(200).json(response);
  }
}
