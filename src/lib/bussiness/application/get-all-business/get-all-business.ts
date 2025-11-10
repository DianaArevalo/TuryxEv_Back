import { Limit, Page } from '../../../Shared/domain';
import { BusinessRepository } from '../../domain';

interface GetAllBusinessHandlerProps {
  page?: number;
  limit?: number;
}

export class GetAllBusiness {
  constructor(private readonly repository: BusinessRepository) {}

  async handler(props: GetAllBusinessHandlerProps) {
    const result = await this.repository.getAll(
      Page.create(props.page),
      Limit.create(props.limit),
    );

    return result.map((it) => it.toPublicResponse());
  }
}
