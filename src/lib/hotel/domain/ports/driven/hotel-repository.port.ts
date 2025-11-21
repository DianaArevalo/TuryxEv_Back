import {
  Hotel,
  HotelEmail,
  HotelId,
  HotelPlan,
  HotelProviderData,
  HotelRole,
  HotelStatus,
} from '../../entities';

import { LimitValueObject, PageValueObject } from '~/lib/shared/domain';

export interface HotelRepositoryPort {
  getAll(page: PageValueObject, limit: LimitValueObject): Promise<Hotel[]>;
  getOneByEmail(email: HotelEmail): Promise<Hotel | null>;
  getOneById(id: HotelId): Promise<Hotel | null>;
  create(hotel: Hotel): Promise<Hotel>;
  edit(hotel: Hotel): Promise<Hotel>;
  updateStatus(id: HotelId, status: HotelStatus): Promise<void>;

  // Methods business logic

  getByPlan(
    plan: HotelPlan,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Hotel[]>;
  getByRole(
    role: HotelRole,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Hotel[]>;
  getByStatus(
    status: HotelStatus,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Hotel[]>;
  getByProvider(
    provider: HotelProviderData,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Hotel[]>;

  findExpiredFreePlans(currentDate: Date): Promise<Hotel[]>;
}
