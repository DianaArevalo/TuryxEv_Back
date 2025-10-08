import { Limit, Page } from "~/lib/Shared/domain";
import { BusinessPlan, BusinessRepository } from "../../domain";

interface GetAllBusinessByPlanHandlerProps {
  plan: string;
  page?: number;
  limit?: number;
}

export class GetAllBusinessByPlan {
  constructor(private readonly repository: BusinessRepository) {}

  async handler(props: GetAllBusinessByPlanHandlerProps) {
    const result = await this.repository.getByPlan(
      BusinessPlan.create(props.plan),
      Page.create(props.page),
      Limit.create(props.limit)
    );

    return result.map((it) => it.toPublicResponse());
  }
}
