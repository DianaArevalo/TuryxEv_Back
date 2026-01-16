import { Limit } from "../../../../lib/Shared/domain/value-objects/limit";
import { Page } from "../../../../lib/Shared/domain/value-objects/page";
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
  HotelPicture,
  HotelLocation,
  HotelProviderData
} from "../../domain";

export class InMemoryHotelRepository {
  private hotels: Hotel[] = [];

  private rebuild(h: Hotel): Hotel {
    return new Hotel({
      hotelId: new HotelId(h.hotelId?.value ?? ""),
      name: h.name instanceof Object ? h.name : HotelName.create(h.name as any),
      email: h.email instanceof Object ? h.email : HotelEmail.create(h.email as any),
      password:
        h.password instanceof Object
          ? h.password
          : h.password
          ? HotelPassword.create(h.password as any)
          : undefined,
      location: h.location,
      picture: h.picture instanceof Object ? h.picture : new HotelPicture(h.picture as any),
      score:
  h.score instanceof HotelScore
    ? h.score
    : HotelScore.create(typeof h.score === "number" ? h.score : Number(h.score) || 1),
      plan: 
          h.plan instanceof Object 
      ? h.plan 
      : HotelPlan.create(h.plan as any),
      role: h.role instanceof Object ? h.role : HotelRole.create(h.role as any),
      status: h.status instanceof Object ? h.status : HotelStatus.create(h.status as any),
      providerData:
        h.providerData instanceof Object
          ? h.providerData
          : HotelProviderData.create(h.providerData as any),
      createdAt: h.createdAt,
      updatedAt: h.updatedAt,
      freePlanEnd: h.freePlanEnd,
    });
  }

  private paginate(items: Hotel[], page: Page, limit: Limit): Hotel[] {
    const start = (page.value - 1) * limit.value;
    const end = start + limit.value;
    return items.slice(start, end).map(h => this.rebuild(h));
  }

  async getAll(page: Page, limit: Limit): Promise<Hotel[]> {
    return this.paginate(this.hotels, page, limit);
  }

  async getOneByEmail(email: HotelEmail): Promise<Hotel | null> {
    const h = this.hotels.find(h => h.email.value === email.value);
    return h ? this.rebuild(h) : null;
  }

  async getOneById(id: HotelId): Promise<Hotel | null> {
    const h = this.hotels.find(h => h.hotelId?.value === id.value);
    return h ? this.rebuild(h) : null;
  }

  async create(hotel: Hotel): Promise<Hotel> {
    hotel.hotelId = new HotelId((this.hotels.length + 1).toString());

    const exists = this.hotels.some(h => h.email.value === hotel.email.value);
    if (exists) throw new Error("Hotel already exists");

    this.hotels.push(hotel);
    return hotel;
  }

  async edit(hotel: Hotel): Promise<void> {
   const index = this.hotels.findIndex(h => h.email.value === hotel.email.value);
    if (index !== -1) {
      this.hotels[index] = hotel; 
    }
    return
  }

  async updateStatus(id: HotelId, status: HotelStatus): Promise<void> {
    const hotel = this.hotels.find(h => h.hotelId && h.hotelId.equals(id));
  if (!hotel) throw new Error("Hotel not found");
  hotel.status = status;
  
  }

  async getByPlan(plan: HotelPlan, page: Page, limit: Limit): Promise<Hotel[]> {
    const filtered = this.hotels.filter(h => h.plan.getValue() === plan.getValue());
    return this.paginate(filtered, page, limit);
  }

  async getByRole(role: HotelRole, page: Page, limit: Limit): Promise<Hotel[]> {
    const filtered = this.hotels.filter(h => h.role.getValue() === role.getValue());
    return this.paginate(filtered, page, limit);
  }

  async getByStatus(status: HotelStatus, page: Page, limit: Limit): Promise<Hotel[]> {
    const filtered = this.hotels.filter(h => h.status.getValue() === status.getValue());
    return this.paginate(filtered, page, limit);
  }

  async getByProvider(providerData: HotelProviderData, page: Page, limit: Limit): Promise<Hotel[]> {
    const filtered = this.hotels.filter(
      h => h.providerData.value === providerData.value
    );
    return this.paginate(filtered, page, limit);
  }

  async findExpiredFreePlans(currentDate: Date): Promise<Hotel[]> {
     return this.hotels.filter(hotel => {
    const planValue = hotel.plan.getValue();
    const isFreePlan = planValue === "FREE";
    const isExpired = hotel.freePlanEnd?.hasExpired(currentDate) ?? false;
    return isFreePlan && isExpired;
  });
  }

  
}
