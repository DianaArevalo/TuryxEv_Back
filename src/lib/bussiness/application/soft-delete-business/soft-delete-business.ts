import { BusinessId, BusinessRepository } from '../../domain';

interface SoftDeleteBusinessHandlerProps {
  id: string;
}

export class SoftDeleteBusiness {
  constructor(private readonly repository: BusinessRepository) {}

  async handler(props: SoftDeleteBusinessHandlerProps) {
    await this.repository.softDelete(new BusinessId(props.id));
  }
}
