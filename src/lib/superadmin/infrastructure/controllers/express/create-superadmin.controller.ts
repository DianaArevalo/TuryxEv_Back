import { ApiResponse } from '~/lib/shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/shared/Infraestructure/External';
import {
  CreateSuperAdminDTO,
  CreateSuperAdminUseCase,
} from '~/lib/superadmin/application';
import { SuperAdminResponse } from '~/lib/superadmin/domain';

export class CreateSuperAdminController {
  constructor(
    private readonly createSuperAdminUseCase: CreateSuperAdminUseCase,
  ) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as CreateSuperAdminDTO;

    const result = await this.createSuperAdminUseCase.execute(body);

    const response: ApiResponse<SuperAdminResponse> = {
      success: true,
      title: 'Superadmin created',
      message: `Superadmin '${result.name}' created.`,
      body: result,
    };

    return res.status(200).json(response);
  }
}
