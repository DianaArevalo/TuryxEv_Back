import { ApiResponse, express as ex } from '~/lib/shared/infrastructure';
import { GetOneUserDTO, GetOneUserUseCase } from '~/lib/user/application';
import { UserResponse } from '~/lib/user/domain';

export class GetOneUserController {
  constructor(private readonly getOneUserUseCase: GetOneUserUseCase) {}

  async handle(req: ex.Request, res: ex.Response) {
    const query = req.query as GetOneUserDTO;

    const result = await this.getOneUserUseCase.execute(query);

    const response: ApiResponse<UserResponse> = {
      success: true,
      title: 'User retrieved',
      message: `A user were successfully retrieved.`,
      body: result,
    };

    return res.status(200).json(response);
  }
}
