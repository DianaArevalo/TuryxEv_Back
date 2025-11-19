import { Limit } from '../../../../lib/Shared/domain/value-objects/limit';
import { Page } from '../../../../lib/Shared/domain/value-objects/page';
import {
  Hotel,
  HotelEmail,
  HotelI,
  HotelId,
  HotelPlan,
  HotelProviderData,
  HotelStatus,
} from '../entities';
import { HotelRole } from '../entities/Hotel/value-objects/HotelRole';

export interface HotelRepository {
  getAll(page: Page, limit: Limit): Promise<Hotel[]>;
  getOneByEmail(email: HotelEmail): Promise<Hotel | null>;
  getOneById(id: HotelId): Promise<Hotel | null>;
  create(hotel: HotelI): Promise<Hotel>;
  edit(hotel: Hotel): Promise<Hotel | void>;
  //delete(id: HotelId): Promise<void>;
  updateStatus(id: HotelId, status: HotelStatus): Promise<void>;

  // Methods business logic

  getByPlan(plan: HotelPlan, page: Page, limit: Limit): Promise<Hotel[]>;
  getByRole(role: HotelRole, page: Page, limit: Limit): Promise<Hotel[]>;
  getByStatus(status: HotelStatus, page: Page, limit: Limit): Promise<Hotel[]>;

  getByProvider(
    provider: HotelProviderData,
    page: Page,
    limit: Limit,
  ): Promise<Hotel[]>;
  //findExpiredFreePlans(now: Date, id: HotelId): Promise<Hotel[]>;
  findExpiredFreePlans(currentDate: Date): Promise<Hotel[]>;
}
