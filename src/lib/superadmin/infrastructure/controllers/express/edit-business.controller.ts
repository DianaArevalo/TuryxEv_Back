import { ApiResponse, express as ex } from '~/lib/shared/infrastructure';
import {
  EditBusinessProps,
  SuperAdminBusinessServicePort,
} from '~/lib/superadmin/domain';

export class SuperAdminEditBusinessController {
  constructor(
    private readonly businessService: SuperAdminBusinessServicePort,
  ) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as EditBusinessProps;

    await this.businessService.edit(body);

    const response: ApiResponse<null> = {
      success: true,
      title: 'Business edited',
      message: `Business with ID '${body.businessId}' edited`,
      body: null,
    };

    return res.status(200).json(response);
  }
}
