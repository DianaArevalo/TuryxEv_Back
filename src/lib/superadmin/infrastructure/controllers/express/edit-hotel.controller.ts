import { ApiResponse } from '~/lib/shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/shared/Infraestructure/External';
import {
  EditHotelProps,
  SuperAdminHotelServicePort,
} from '~/lib/superadmin/domain';

export class SuperAdminEditHotelController {
  constructor(private readonly hotelService: SuperAdminHotelServicePort) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as EditHotelProps;

    await this.hotelService.edit(body);

    const response: ApiResponse<null> = {
      success: true,
      title: 'Hotel edited',
      message: `Hotel with ID '${body.hotelId}' edited`,
      body: null,
    };

    return res.status(200).json(response);
  }
}
