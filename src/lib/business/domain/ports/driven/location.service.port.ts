import { BusinessId, BusinessLocation } from '../../entities';

export interface LocationServicePort {
  create(
    location: BusinessLocation,
    businessId: BusinessId,
  ): Promise<BusinessLocation>;
  edit(location: BusinessLocation): Promise<void>;
}
