import {
  Business,
  BusinessEmail,
  BusinessId,
  BusinessPlan,
  BusinessProviderData,
  BusinessRole,
  BusinessStatus,
} from '../entities';

import { Limit, Page } from '~/lib/Shared/domain';

export interface BusinessRepository {
  getAll(page: Page, limit: Limit): Promise<Business[]>;
  getOneByEmail(email: BusinessEmail): Promise<Business | null>;
  getOneById(id: BusinessId): Promise<Business | null>;
  create(business: Business): Promise<Business>;
  edit(business: Business): Promise<Business>;
  softDelete(id: BusinessId): Promise<void>;

  getByPlan(plan: BusinessPlan, page: Page, limit: Limit): Promise<Business[]>;
  getByRole(role: BusinessRole, page: Page, limit: Limit): Promise<Business[]>;
  getByStatus(
    status: BusinessStatus,
    page: Page,
    limit: Limit,
  ): Promise<Business[]>;
  getByProvider(
    providerData: BusinessProviderData,
    page: Page,
    limit: Limit,
  ): Promise<Business[]>;
}
