import {
  EditBusinessDTO,
  EditBusinessUseCase,
} from '~/lib/bussiness/application';
import { BusinessPrivateResponse } from '~/lib/bussiness/domain';
import { ApiResponse } from '~/lib/Shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/Shared/Infraestructure/External';

export class EditBusinessController {
  constructor(private readonly editBusinessUseCase: EditBusinessUseCase) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as EditBusinessDTO;

    const edited = await this.editBusinessUseCase.execute(body);

    const response: ApiResponse<BusinessPrivateResponse> = {
      success: true,
      title: 'Business edited',
      message: `Business '${edited.name}' edited.`,
      body: edited,
    };

    res.status(200).json(response);
  }
}
