import {
  Business,
  BusinessPlan,
  BusinessProviderData,
  BusinessPublicResponse,
  BusinessRepositoryPort,
  BusinessRole,
  BusinessStatus,
} from '~/lib/business/domain';
import { UseCase } from '~/lib/shared/application/usecase';
import { LimitValueObject, PageValueObject } from '~/lib/shared/domain';

export interface GetBusinessesDTO {
  page?: number | string;
  limit?: number | string;
  plan?: string;
  providerData?: string;
  role?: string;
  status?: string;
}

export class GetBusinessesUseCase
  implements UseCase<GetBusinessesDTO, BusinessPublicResponse[]>
{
  constructor(private readonly repository: BusinessRepositoryPort) {}

  async execute(props: GetBusinessesDTO): Promise<BusinessPublicResponse[]> {
    const page = PageValueObject.create(props.page);
    const limit = LimitValueObject.create(props.limit);

    let result: Business[] | undefined = undefined;

    if (props.plan)
      result = await this.repository.getByPlan(
        BusinessPlan.create(props.plan),
        page,
        limit,
      );
    else if (props.providerData)
      result = await this.repository.getByProvider(
        BusinessProviderData.create(props.providerData),
        page,
        limit,
      );
    else if (props.role)
      result = await this.repository.getByRole(
        BusinessRole.create(props.role),
        page,
        limit,
      );
    else if (props.status)
      result = await this.repository.getByStatus(
        BusinessStatus.create(props.status),
        page,
        limit,
      );
    else result = await this.repository.getAll(page, limit);

    return result.map((it) => it.toPublicResponse());
  }
}
