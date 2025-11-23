import { GetValidCitiesUseCase } from '~/lib/location/application';
import { CityResponse } from '~/lib/location/domain';
import { ApiResponse, express as ex } from '~/lib/shared/infrastructure';

export class GetValidCitiesController {
  constructor(private readonly getValidCitiesUsecase: GetValidCitiesUseCase) {}

  async handle(_req: ex.Request, res: ex.Response) {
    const validCities = await this.getValidCitiesUsecase.execute();

    const response: ApiResponse<CityResponse[]> = {
      success: true,
      title: 'Cities Found',
      message: 'Valid cities retrieved successfully.',
      body: validCities,
    };

    res.status(200).json(response);
  }
}
