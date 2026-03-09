import { HotelResponse } from '../../entities';

import { EditHotelDTO } from '~/lib/hotel/application/use-cases';

export interface HotelServicePort {
  edit(props: EditHotelDTO): Promise<HotelResponse>;
}
