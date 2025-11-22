import { ApiResponse, express as ex } from '~/lib/shared/infrastructure';
import { EditUserDTO, EditUserUseCase } from '~/lib/user/application';
import { UserResponse } from '~/lib/user/domain';

export class EditUserController {
  constructor(private readonly editUserUseCase: EditUserUseCase) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as EditUserDTO;

    const result = await this.editUserUseCase.execute(body);

    const response: ApiResponse<UserResponse> = {
      success: true,
      title: 'User edited',
      message: `User '${result.name}' edited`,
      body: result,
    };

    return res.status(200).json(response);
  }
}
