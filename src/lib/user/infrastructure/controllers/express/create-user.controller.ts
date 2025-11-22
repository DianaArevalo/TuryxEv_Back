import { ApiResponse, express as ex } from '~/lib/shared/infrastructure';
import { CreateUserDTO, CreateUserUseCase } from '~/lib/user/application';
import { UserResponse } from '~/lib/user/domain';

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as CreateUserDTO;

    const result = await this.createUserUseCase.execute(body);

    const response: ApiResponse<UserResponse> = {
      success: true,
      title: 'User created',
      message: `User '${result.name}' created`,
      body: result,
    };

    return res.status(201).json(response);
  }
}
