import { LimitValueObject, PageValueObject } from '../../../../shared/domain';
import {
  Business,
  BusinessEmail,
  BusinessId,
  BusinessPlan,
  BusinessProviderData,
  BusinessRole,
  BusinessStatus,
} from '../../entities';

export interface BusinessRepositoryPort {
  getAll(page: PageValueObject, limit: LimitValueObject): Promise<Business[]>;
  getOneByEmail(email: BusinessEmail): Promise<Business | null>;
  getOneById(id: BusinessId): Promise<Business | null>;
  create(business: Business): Promise<Business>;
  edit(business: Business): Promise<Business>;
  softDelete(id: BusinessId): Promise<void>;

  getByPlan(
    plan: BusinessPlan,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Business[]>;
  getByRole(
    role: BusinessRole,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Business[]>;
  getByStatus(
    status: BusinessStatus,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Business[]>;
  getByProvider(
    providerData: BusinessProviderData,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Business[]>;
}
