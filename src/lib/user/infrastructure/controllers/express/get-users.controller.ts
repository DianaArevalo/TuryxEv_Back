import { ApiResponse, express as ex } from '~/lib/shared/infrastructure';
import { GetUsersDTO, GetUsersUseCase } from '~/lib/user/application';
import { UserResponse } from '~/lib/user/domain';

export class GetUsersController {
  constructor(private readonly getUsersUseCase: GetUsersUseCase) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as GetUsersDTO;

    const result = await this.getUsersUseCase.execute(body);

    const response: ApiResponse<UserResponse[]> = {
      success: true,
      title: 'Users retrieved',
      message: `A total of ${result.length} users were successfully retrieved.`,
      body: result,
    };

    return res.status(200).json(response);
  }
}
