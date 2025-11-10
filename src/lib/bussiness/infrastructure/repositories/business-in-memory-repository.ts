import { Page, Limit } from '../../../Shared/domain';
import {
  Business,
  BusinessEmail,
  BusinessId,
  BusinessNotFoundError,
  BusinessPlan,
  BusinessProviderData,
  BusinessRepository,
  BusinessRole,
  BusinessStatus,
} from '../../domain';

export class InMemoryBusinessRepository implements BusinessRepository {
  private businesses: Business[] = [];

  private paginate(items: Business[], page: Page, limit: Limit): Business[] {
    const start = (page.value - 1) * limit.value;
    const end = start + limit.value;
    return items.slice(start, end);
  }

  getAll(page: Page, limit: Limit): Promise<Business[]> {
    const active = this.businesses.filter((b) => b.status.value !== 'BLOCKED');
    return Promise.resolve(this.paginate(active, page, limit));
  }

  getOneByEmail(email: BusinessEmail): Promise<Business | null> {
    return Promise.resolve(
      this.businesses.find((b) => b.email.value === email.value) ?? null,
    );
  }

  getOneById(id: BusinessId): Promise<Business | null> {
    return Promise.resolve(
      this.businesses.find((b) => b.bussinessId.value === id.value) ?? null,
    );
  }

  create(business: Business): Promise<Business> {
    business.bussinessId = new BusinessId(business.name.value);

    const exists = this.businesses.some(
      (b) => b.bussinessId.value === business.bussinessId.value,
    );
    if (exists) throw new Error('Business already exists');

    this.businesses.push(business);
    return Promise.resolve(business);
  }

  edit(business: Business): Promise<Business> {
    const index = this.businesses.findIndex(
      (b) => b.bussinessId.value === business.bussinessId.value,
    );
    if (index === -1) throw new Error('Business not found');

    this.businesses[index] = business;
    return Promise.resolve(business);
  }

  softDelete(id: BusinessId): Promise<void> {
    const index = this.businesses.findIndex(
      (b) => b.bussinessId.value === id.value,
    );
    if (index === -1) throw new BusinessNotFoundError();

    this.businesses[index].status = new BusinessStatus('BLOCKED');
    return Promise.resolve();
  }

  getByPlan(plan: BusinessPlan, page: Page, limit: Limit): Promise<Business[]> {
    const filtered = this.businesses.filter(
      (b) => b.idPlan.value === plan.value,
    );
    return Promise.resolve(this.paginate(filtered, page, limit));
  }

  getByRole(role: BusinessRole, page: Page, limit: Limit): Promise<Business[]> {
    const filtered = this.businesses.filter(
      (b) => b.idRole.value === role.value,
    );
    return Promise.resolve(this.paginate(filtered, page, limit));
  }

  getByStatus(
    status: BusinessStatus,
    page: Page,
    limit: Limit,
  ): Promise<Business[]> {
    const filtered = this.businesses.filter(
      (b) => b.status.value === status.value,
    );
    return Promise.resolve(this.paginate(filtered, page, limit));
  }

  getByProvider(
    providerData: BusinessProviderData,
    page: Page,
    limit: Limit,
  ): Promise<Business[]> {
    const filtered = this.businesses.filter(
      (b) => b.providerData.value === providerData.value,
    );
    return Promise.resolve(this.paginate(filtered, page, limit));
  }
}
