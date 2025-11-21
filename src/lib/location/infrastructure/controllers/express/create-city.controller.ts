import {
  CreateCityDTO,
  CreateCityUseCase,
} from '~/lib/location/application/use-cases';
import { CityResponse } from '~/lib/location/domain';
import { ApiResponse } from '~/lib/shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/shared/Infraestructure/External';

export class CreateCityController {
  constructor(private readonly createCityUseCase: CreateCityUseCase) {}

  async handle(req: ex.Request, res: ex.Response) {
    const body = req.body as CreateCityDTO;
    const city = await this.createCityUseCase.execute(body);

    const response: ApiResponse<CityResponse> = {
      success: true,
      title: 'City created',
      message: `City '${city.name}' created.`,
      body: city,
    };

    res.status(201).json(response);
  }
}
