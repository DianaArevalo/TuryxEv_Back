import {
  Hotel,
  HotelEmail,
  HotelId,
  HotelPlan,
  HotelProviderData,
  HotelRepositoryPort,
  HotelRole,
  HotelStatus,
  LocationServicePort,
} from '../../domain';

import { PageValueObject, LimitValueObject } from '~/lib/Shared/domain';

export class HotelRepositoryInMemoryAdapter implements HotelRepositoryPort {
  private hotels: Hotel[] = [];

  constructor(private readonly locationService: LocationServicePort) {}

  getAll(page: PageValueObject, limit: LimitValueObject): Promise<Hotel[]> {
    return Promise.resolve(this.paginate(this.hotels, page, limit));
  }

  getOneByEmail(email: HotelEmail): Promise<Hotel | null> {
    const h = this.hotels.find((h) => h.email.value === email.value);
    return Promise.resolve(h || null);
  }

  getOneById(id: HotelId): Promise<Hotel | null> {
    const h = this.hotels.find((h) => h.hotelId?.value === id.value);
    return Promise.resolve(h || null);
  }

  create(hotel: Hotel): Promise<Hotel> {
    hotel.hotelId = new HotelId((this.hotels.length + 1).toString());

    const exists = this.hotels.some((h) => h.email.value === hotel.email.value);
    if (exists) throw new Error('Hotel already exists');

    this.hotels.push(hotel);

    return Promise.resolve(hotel);
  }

  edit(hotel: Hotel): Promise<Hotel> {
    const index = this.hotels.findIndex(
      (h) => h.email.value === hotel.email.value,
    );
    if (index !== -1) this.hotels[index] = hotel;

    return Promise.resolve(hotel);
  }

  updateStatus(id: HotelId, status: HotelStatus): Promise<void> {
    const hotel = this.hotels.find((h) => h.hotelId && h.hotelId.equals(id));
    if (!hotel) throw new Error('Hotel not found');
    hotel.status = status;
    return Promise.resolve();
  }

  getByPlan(
    plan: HotelPlan,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Hotel[]> {
    const filtered = this.hotels.filter((h) => h.plan.value === plan.value);
    return Promise.resolve(this.paginate(filtered, page, limit));
  }

  getByRole(
    role: HotelRole,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Hotel[]> {
    const filtered = this.hotels.filter((h) => h.role.value === role.value);
    return Promise.resolve(this.paginate(filtered, page, limit));
  }

  getByStatus(
    status: HotelStatus,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Hotel[]> {
    const filtered = this.hotels.filter((h) => h.status.value === status.value);
    return Promise.resolve(this.paginate(filtered, page, limit));
  }

  getByProvider(
    provider: HotelProviderData,
    page: PageValueObject,
    limit: LimitValueObject,
  ): Promise<Hotel[]> {
    const filtered = this.hotels.filter(
      (h) => h.providerData.value === provider.value,
    );
    return Promise.resolve(this.paginate(filtered, page, limit));
  }

  findExpiredFreePlans(currentDate: Date): Promise<Hotel[]> {
    return Promise.resolve(
      this.hotels.filter((hotel) => {
        const planValue = hotel.plan.value;
        const isFreePlan = planValue === 'FREE';
        const isExpired = hotel.freePlanEnd?.hasExpired(currentDate) ?? false;
        return isFreePlan && isExpired;
      }),
    );
  }

  private paginate(
    items: Hotel[],
    page: PageValueObject,
    limit: LimitValueObject,
  ): Hotel[] {
    const start = (page.value - 1) * limit.value;
    const end = start + limit.value;
    return items.slice(start, end);
  }
}
