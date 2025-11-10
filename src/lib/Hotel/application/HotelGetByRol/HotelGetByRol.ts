import { Limit } from '../../../../lib/Shared/domain/value-objects/limit';
import { Page } from '../../../../lib/Shared/domain/value-objects/page';
import { HotelRepository, HotelRole, HotelRoleT } from '../../domain';

interface HotelGetByRolProps {
  role: string;
  page?: number;
  limit?: number;
}

export class HotelGetByRol {
  constructor(private readonly repository: HotelRepository) {}

  async handler(props: HotelGetByRolProps) {
    const result = await this.repository.getByRole(
      HotelRole.create(props.role as HotelRoleT),
      Page.create(props.page),
      Limit.create(props.limit),
    );

    return result.map((it) => it.toResponse());
  }
}
