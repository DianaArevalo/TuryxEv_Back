import { Limit } from '../../../../lib/Shared/domain/value-objects/limit';
import { Page } from '../../../../lib/Shared/domain/value-objects/page';
import {
  Hotel,
  HotelEmail,
  HotelId,
  HotelName,
  HotelPassword,
  HotelPlan,
  HotelRole,
  HotelScore,
  HotelStatus,
  HotelProviderData,
} from '../../domain';

export class InMemoryHotelRepository {
  private hotels: Hotel[] = [];

  private rebuild(h: Hotel): Hotel {
    return new Hotel({
      hotelId: new HotelId(h.hotelId?.value ?? ''),
      name: h.name instanceof Object ? h.name : HotelName.create(h.name),
      email: h.email instanceof Object ? h.email : HotelEmail.create(h.email),
      password:
        h.password instanceof Object
          ? h.password
          : h.password
            ? HotelPassword.create(h.password)
            : undefined,
      location: h.location,
      picture: h.picture instanceof Object ? h.picture : undefined,
      score:
        h.score instanceof HotelScore
          ? h.score
          : HotelScore.create(
              typeof h.score === 'number' ? h.score : Number(h.score) || 1,
            ),
      plan: h.plan instanceof Object ? h.plan : HotelPlan.create(h.plan),
      role: h.role instanceof Object ? h.role : HotelRole.create(h.role),
      status:
        h.status instanceof Object ? h.status : HotelStatus.create(h.status),
      providerData:
        h.providerData instanceof Object
          ? h.providerData
          : HotelProviderData.create(h.providerData),
      createdAt: h.createdAt,
      updatedAt: h.updatedAt,
      freePlanEnd: h.freePlanEnd,
    });
  }

  private paginate(items: Hotel[], page: Page, limit: Limit): Hotel[] {
    const start = (page.value - 1) * limit.value;
    const end = start + limit.value;
    return items.slice(start, end).map((h) => this.rebuild(h));
  }

  getAll(page: Page, limit: Limit): Promise<Hotel[]> {
    return Promise.resolve(this.paginate(this.hotels, page, limit));
  }

  getOneByEmail(email: HotelEmail): Promise<Hotel | null> {
    const h = this.hotels.find((h) => h.email.value === email.value);
    return Promise.resolve(h ? this.rebuild(h) : null);
  }

  getOneById(id: HotelId): Promise<Hotel | null> {
    const h = this.hotels.find((h) => h.hotelId?.value === id.value);
    return Promise.resolve(h ? this.rebuild(h) : null);
  }

  create(hotel: Hotel): Promise<Hotel> {
    hotel.hotelId = new HotelId((this.hotels.length + 1).toString());

    const exists = this.hotels.some((h) => h.email.value === hotel.email.value);
    if (exists) throw new Error('Hotel already exists');

    this.hotels.push(hotel);
    return Promise.resolve(hotel);
  }

  edit(hotel: Hotel): Promise<void> {
    const index = this.hotels.findIndex(
      (h) => h.email.value === hotel.email.value,
    );
    if (index !== -1) {
      this.hotels[index] = hotel;
    }
    return Promise.resolve();
  }

  updateStatus(id: HotelId, status: HotelStatus): Promise<void> {
    const hotel = this.hotels.find((h) => h.hotelId && h.hotelId.equals(id));
    if (!hotel) throw new Error('Hotel not found');
    hotel.status = status;
    return Promise.resolve();
  }

  getByPlan(plan: HotelPlan, page: Page, limit: Limit): Promise<Hotel[]> {
    const filtered = this.hotels.filter(
      (h) => h.plan.getValue() === plan.getValue(),
    );
    return Promise.resolve(this.paginate(filtered, page, limit));
  }

  getByRole(role: HotelRole, page: Page, limit: Limit): Promise<Hotel[]> {
    const filtered = this.hotels.filter(
      (h) => h.role.getValue() === role.getValue(),
    );
    return Promise.resolve(this.paginate(filtered, page, limit));
  }

  getByStatus(status: HotelStatus, page: Page, limit: Limit): Promise<Hotel[]> {
    const filtered = this.hotels.filter(
      (h) => h.status.getValue() === status.getValue(),
    );
    return Promise.resolve(this.paginate(filtered, page, limit));
  }

  getByProvider(
    providerData: HotelProviderData,
    page: Page,
    limit: Limit,
  ): Promise<Hotel[]> {
    const filtered = this.hotels.filter(
      (h) => h.providerData.value === providerData.value,
    );
    return Promise.resolve(this.paginate(filtered, page, limit));
  }

  findExpiredFreePlans(currentDate: Date): Promise<Hotel[]> {
    return Promise.resolve(
      this.hotels.filter((hotel) => {
        const planValue = hotel.plan.getValue();
        const isFreePlan = planValue === 'FREE';
        const isExpired = hotel.freePlanEnd?.hasExpired(currentDate) ?? false;
        return isFreePlan && isExpired;
      }),
    );
  }
}
