import { Limit, Page } from '../../../Shared/domain';
import { BusinessRepository, BusinessRole } from '../../domain';

interface GetAllBusinessByRoleHandlerProps {
  role: string;
  page?: number;
  limit?: number;
}

export class GetAllBusinessByRole {
  constructor(private readonly repository: BusinessRepository) {}

  async handler(props: GetAllBusinessByRoleHandlerProps) {
    const result = await this.repository.getByRole(
      BusinessRole.create(props.role),
      Page.create(props.page),
      Limit.create(props.limit),
    );

    return result.map((it) => it.toPublicResponse());
  }
}
