import { HotelId, HotelLocation } from '../../entities';

import { IdValueObject } from '~/lib/Shared/domain';

export interface LocationServicePort {
  create(location: HotelLocation, hotelId: HotelId): Promise<HotelLocation>;
  edit(location: HotelLocation): Promise<void>;
  getLocationById(id: IdValueObject): Promise<HotelLocation>;
}
