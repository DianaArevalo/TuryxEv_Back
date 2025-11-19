import {
  HotelPlan,
  HotelRepositoryPort,
  HotelStatus,
} from '~/lib/hotel/domain';
import { UseCase } from '~/lib/Shared/application/usecase';
import { LimitValueObject, PageValueObject } from '~/lib/Shared/domain';

export interface CheckHotelFreePlansDTO {
  page?: number;
  limit?: number;
}

export class CheckHotelFreePlansUseCase
  implements UseCase<CheckHotelFreePlansDTO, void>
{
  constructor(private readonly repository: HotelRepositoryPort) {}

  async execute({
    page = 1,
    limit = 50,
  }: CheckHotelFreePlansDTO): Promise<void> {
    const plan = HotelPlan.create('FREE');
    const pageVO = new PageValueObject(page);
    const limitVO = new LimitValueObject(limit);
    const currentDate = new Date(Date.now());

    const freeHotels = await this.repository.getByPlan(plan, pageVO, limitVO);

    await Promise.all(
      freeHotels.map(async (hotel) => {
        const planValue = hotel.plan.value;
        const statusValue = hotel.status.value;

        const isFreePlan = planValue === 'FREE';
        const isExpired = hotel.freePlanEnd?.hasExpired(currentDate) ?? false;

        if (isFreePlan && statusValue !== 'BLOCKED' && isExpired) {
          hotel.status = HotelStatus.create('BLOCKED');
          await this.repository.edit(hotel);
        }
      }),
    );
  }
}
