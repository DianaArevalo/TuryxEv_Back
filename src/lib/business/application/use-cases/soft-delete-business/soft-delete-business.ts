import { BusinessId, BusinessRepositoryPort } from '~/lib/business/domain';
import { UseCase } from '~/lib/shared/application';

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
