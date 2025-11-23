import {
  Hotel,
  HotelPlan,
  HotelProviderData,
  HotelRepositoryPort,
  HotelResponse,
  HotelRole,
  HotelStatus,
} from '~/lib/hotel/domain';
import { UseCase } from '~/lib/shared/application';
import { LimitValueObject, PageValueObject } from '~/lib/shared/domain';

export interface GetHotelsDTO {
  page?: number | string;
  limit?: number | string;
  plan?: string;
  providerData?: string;
  role?: string;
  status?: string;
}

export class GetHotelsUseCase
  implements UseCase<GetHotelsDTO, HotelResponse[]>
{
  constructor(private readonly repository: HotelRepositoryPort) {}

  async execute(props: GetHotelsDTO): Promise<HotelResponse[]> {
    const page = PageValueObject.create(props.page);
    const limit = LimitValueObject.create(props.limit);

    let result: Hotel[] | undefined = undefined;

    if (props.plan)
      result = await this.repository.getByPlan(
        HotelPlan.create(props.plan),
        page,
        limit,
      );
    else if (props.providerData)
      result = await this.repository.getByProvider(
        HotelProviderData.create(props.providerData),
        page,
        limit,
      );
    else if (props.role)
      result = await this.repository.getByRole(
        HotelRole.create(props.role),
        page,
        limit,
      );
    else if (props.status)
      result = await this.repository.getByStatus(
        HotelStatus.create(props.status),
        page,
        limit,
      );
    else result = await this.repository.getAll(page, limit);

    return result.map((it) => it.toResponse());
  }
}
