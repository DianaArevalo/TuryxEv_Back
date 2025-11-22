import { ApiResponse, express as ex } from '~/lib/shared/infrastructure';
import {
  SoftDeleteUserDTO,
  SoftDeleteUserUseCase,
} from '~/lib/user/application';

export class SoftDeleteUserController {
  constructor(private readonly softDeleteUserUseCase: SoftDeleteUserUseCase) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as SoftDeleteUserDTO;

    await this.softDeleteUserUseCase.execute(body);

    const response: ApiResponse<null> = {
      success: true,
      title: 'User deleted',
      message: `A user were successfully deleted.`,
      body: null,
    };

    return res.status(200).json(response);
  }
}
