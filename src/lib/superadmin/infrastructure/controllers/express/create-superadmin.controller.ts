import { ApiResponse, express as ex } from '~/lib/shared/infrastructure';
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

    return res.status(201).json(response);
  }
}
