import {
  GetLocationByOwnerDTO,
  GetLocationByOwnerUseCase,
} from '~/lib/location/application/use-cases';
import { LocationResponse } from '~/lib/location/domain';
import { ApiResponse } from '~/lib/Shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/Shared/Infraestructure/External';

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
