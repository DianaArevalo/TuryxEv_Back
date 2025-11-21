import {
  EditBusinessDTO,
  EditBusinessUseCase,
} from '~/lib/business/application';
import { BusinessPrivateResponse } from '~/lib/business/domain';
import { ApiResponse } from '~/lib/shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/shared/Infraestructure/External';

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
