import { Limit, Page } from "~/lib/Shared/domain";
import {
  Business,
  BusinessEmail,
  BusinessId,
  BusinessPlan,
  BusinessRole,
  BusinessStatus,
} from "../entities";

export interface BusinessRepository {
  getAll(page: Page, limit: Limit): Promise<Business[]>;
  getOneByEmail(email: BusinessEmail): Promise<Business | null>;
  getOneById(id: BusinessId): Promise<Business | null>;
  create(business: Business): Promise<void>;
  edit(business: Business): Promise<void>;
  delete(id: BusinessId): Promise<void>;

  getByPlan(plan: BusinessPlan, page: Page, limit: Limit): Promise<Business[]>;
  getByRole(role: BusinessRole, page: Page, limit: Limit): Promise<Business[]>;
  getByStatus(
    status: BusinessStatus,
    page: Page,
    limit: Limit
  ): Promise<Business[]>;
}
