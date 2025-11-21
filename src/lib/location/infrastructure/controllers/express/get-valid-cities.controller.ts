import { GetValidCitiesUseCase } from '~/lib/location/application/use-cases';
import { CityResponse } from '~/lib/location/domain';
import { ApiResponse } from '~/lib/shared/Infraestructure/ApiResponse';
import { express as ex } from '~/lib/shared/Infraestructure/External';

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
