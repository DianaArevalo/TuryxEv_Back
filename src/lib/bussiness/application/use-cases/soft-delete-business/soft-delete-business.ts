import { BusinessId, BusinessRepositoryPort } from '~/lib/bussiness/domain';
import { UseCase } from '~/lib/Shared/application/usecase';

export interface SoftDeleteBusinessDTO {
  id: string;
}

export class SoftDeleteBusinessUseCase
  implements UseCase<SoftDeleteBusinessDTO, void>
{
  constructor(private readonly repository: BusinessRepositoryPort) {}

  async execute(props: SoftDeleteBusinessDTO) {
    await this.repository.softDelete(new BusinessId(props.id));
  }
}
