import { Limit, Page } from "../../../Shared/domain";
import { BusinessRepository, BusinessStatus } from "../../domain";

interface GetAllBusinessByStatusHandlerProps {
  status: string;
  page?: number;
  limit?: number;
}

export class GetAllBusinessByStatus {
  constructor(private readonly repository: BusinessRepository) {}

  async handler(props: GetAllBusinessByStatusHandlerProps) {
    const result = await this.repository.getByStatus(
      BusinessStatus.create(props.status),
      Page.create(props.page),
      Limit.create(props.limit)
    );

    return result.map((it) => it.toPublicResponse());
  }
}
