import { BusinessId, BusinessLocation } from '../../entities';

import { IdValueObject } from '~/lib/Shared/domain';

export interface LocationServicePort {
  create(
    location: BusinessLocation,
    businessId: BusinessId,
  ): Promise<BusinessLocation>;
  edit(location: BusinessLocation): Promise<void>;
  getLocationById(id: IdValueObject): Promise<BusinessLocation>;
}
