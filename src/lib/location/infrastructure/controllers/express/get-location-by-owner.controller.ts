import {
  GetLocationByOwnerDTO,
  GetLocationByOwnerUseCase,
} from '~/lib/location/application';
import { LocationResponse } from '~/lib/location/domain';
import { ApiResponse, express as ex } from '~/lib/shared/infrastructure';

export class GetLocationByOwnerController {
  constructor(
    private readonly getLocationByOwnerUseCase: GetLocationByOwnerUseCase,
  ) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as GetLocationByOwnerDTO;

    const location = await this.getLocationByOwnerUseCase.execute(body);

    const response: ApiResponse<LocationResponse> = {
      success: true,
      title: 'Locations',
      message: 'Location of an owner was found.',
      body: location,
    };

    res.status(200).json(response);
  }
}
