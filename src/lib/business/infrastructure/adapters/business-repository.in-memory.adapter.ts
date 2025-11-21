import {
  Business,
  BusinessCreatedAt,
  BusinessEmail,
  BusinessId,
  BusinessNotFoundError,
  BusinessPlan,
  BusinessProviderData,
  BusinessRepositoryPort,
  BusinessRole,
  BusinessStatus,
  BusinessUpdatedAt,
} from '../../domain';
import { LocationServicePort } from '../../domain';

import {
  PageValueObject,
  LimitValueObject,
  IdValueObject,
} from '~/lib/shared/domain';

export class BusinessRepositoryInMemoryAdapter
  implements BusinessRepositoryPort
{
  private businesses: Business[] = [];

  constructor(private readonly locationService: LocationServicePort) {}

  getAll(page: PageValueObject, limit: LimitValueObject): Promise<Business[]> {
    const offset = (page.value - 1) * limit.value;

    return Promise.resolve(
      this.businesses
        .filter((b) => b.status.value !== 'BLOCKED')
        .slice(offset, offset + limit.value),
    );
  }

  getOneByEmail(email: BusinessEmail): Promise<Business | null> {
    const found = this.businesses.find((b) => b.email.value === email.value);
    return Promise.resolve(found ?? null);
  }

  getOneById(id: BusinessId): Promise<Business | null> {
    const found = this.businesses.find((b) => b.bussinessId.value === id.value);
    return Promise.resolve(found ?? null);
  }

  async create(business: Business): Promise<Business> {
    business.bussinessId = new BusinessId(business.name.value);

    const existsByEmail = this.businesses.find(
      (b) => b.email.value === business.email.value,
    );
    if (existsByEmail)
      throw new Error('Business with this email already exists');

    let location = undefined;

    if (business.location?.value?.locationId) {
      location = await this.locationService.getLocationById(
        new IdValueObject(business.location.value.locationId),
      );
    }

    const newBusiness = new Business({
      ...business,
      bussinessId: new BusinessId(
        business.bussinessId.value ?? (this.businesses.length + 1).toString(),
      ),
      createdAt: new BusinessCreatedAt(new Date()),
      updatedAt: new BusinessUpdatedAt(new Date()),
      location,
    });

    this.businesses.push(newBusiness);

    return newBusiness;
  }

  async edit(business: Business): Promise<Business> {
    const index = this.businesses.findIndex(
      (b) => b.bussinessId.value === business.bussinessId.value,
    );

    if (index === -1) throw new BusinessNotFoundError();

    let location = undefined;

    if (business.location?.value?.locationId) {
      location = await this.locationService.getLocationById(
        new IdValueObject(business.location.value.locationId),
      );
    }

    const updated = new Business({
      ...business,
      updatedAt: new BusinessUpdatedAt(new Date()),
      location,
    });

    this.businesses[index] = updated;

    return updated;
  }

  softDelete(id: BusinessId): Promise<void> {
    const index = this.businesses.findIndex(
      (b) => b.bussinessId.value === id.value,
    );

    if (index === -1) throw new BusinessNotFoundError();

    this.businesses[index].status = new BusinessStatus('BLOCKED');

    return Promise.resolve();
  }

  getByPlan(
    plan: BusinessPlan,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Business[]> {
    const offset = (page.value - 1) * limit.value;

    return Promise.resolve(
      this.businesses
        .filter((b) => b.idPlan.value === plan.value)
        .slice(offset, offset + limit.value),
    );
  }

  getByRole(
    role: BusinessRole,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Business[]> {
    const offset = (page.value - 1) * limit.value;

    return Promise.resolve(
      this.businesses
        .filter((b) => b.idRole.value === role.value)
        .slice(offset, offset + limit.value),
    );
  }

  getByStatus(
    status: BusinessStatus,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Business[]> {
    const offset = (page.value - 1) * limit.value;

    return Promise.resolve(
      this.businesses
        .filter((b) => b.status.value === status.value)
        .slice(offset, offset + limit.value),
    );
  }

  getByProvider(
    providerData: BusinessProviderData,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Business[]> {
    const offset = (page.value - 1) * limit.value;

    return Promise.resolve(
      this.businesses
        .filter(
          (b) =>
            JSON.stringify(b.providerData.toPrimitives()) ===
            JSON.stringify(providerData.toPrimitives()),
        )
        .slice(offset, offset + limit.value),
    );
  }
}
