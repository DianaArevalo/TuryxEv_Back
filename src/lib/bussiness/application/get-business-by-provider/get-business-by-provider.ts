import { Limit, Page } from '../../../Shared/domain';
import { BusinessProviderData, BusinessRepository } from '../../domain';

interface GetBusinessByProviderDataHandlerProps {
  providerData: string;
  page?: number;
  limit?: number;
}

export class GetBusinessByProviderData {
  constructor(private readonly repository: BusinessRepository) {}

  async handler(props: GetBusinessByProviderDataHandlerProps) {
    const result = await this.repository.getByProvider(
      BusinessProviderData.create(props.providerData),
      Page.create(props.page),
      Limit.create(props.limit),
    );

    return result.map((it) => it.toPublicResponse());
  }
}
