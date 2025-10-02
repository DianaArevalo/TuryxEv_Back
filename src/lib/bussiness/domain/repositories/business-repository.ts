import {
  Business,
  BusinessEmail,
  BusinessId,
  BusinessPlan,
  BusinessRole,
  BusinessStatus,
} from "../entities";

export interface BusinessRepository {
  getAll(): Promise<Business[]>;
  getOneByEmail(email: BusinessEmail): Promise<Business | null>;
  getOneById(id: BusinessId): Promise<Business | null>;
  create(business: Business): Promise<void>;
  edit(business: Business): Promise<void>;
  delete(id: BusinessId): Promise<void>;

  getByPlan(plan: BusinessPlan): Promise<Business[]>;
  getByRole(role: BusinessRole): Promise<Business[]>;
  getByStatus(status: BusinessStatus): Promise<Business[]>;
}
