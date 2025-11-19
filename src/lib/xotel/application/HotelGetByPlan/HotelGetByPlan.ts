import { Limit } from '../../../../lib/Shared/domain/value-objects/limit';
import { Page } from '../../../../lib/Shared/domain/value-objects/page';
import { HotelPlan, HotelPlanT, HotelRepository } from '../../domain';

interface HotelGetByPlanProps {
  plan: string;
  page?: number;
  limit?: number;
}

export class HotelGetByPlan {
  constructor(private readonly respository: HotelRepository) {}

  async handler(props: HotelGetByPlanProps) {
    const result = await this.respository.getByPlan(
      HotelPlan.create(props.plan as HotelPlanT),
      Page.create(props.page),
      Limit.create(props.limit),
    );

    return result.map((it) => it.toResponse());
  }
}
