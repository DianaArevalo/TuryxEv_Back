import { HotelServicePort } from '~/lib/hotel/domain';
import {
  EditHotelProps,
  SuperAdminHotelServicePort,
} from '~/lib/superadmin/domain';

export class SuperAdminHotelServiceAdapter
  implements SuperAdminHotelServicePort
{
  constructor(private readonly hotelService: HotelServicePort) {}

  async edit(props: EditHotelProps): Promise<void> {
    await this.hotelService.edit(props);
  }
}
