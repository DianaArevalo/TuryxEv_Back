import { Limit } from "../../../../lib/Shared/domain/value-objects/limit";
import { Page } from "../../../../lib/Shared/domain/value-objects/page";
import {
  Hotel,
  HotelEmail,
  HotelId,
  HotelPlan,
  HotelRole,
  HotelStatus,
  ProviderData,
} from "../../domain";


export class InMemoryHotelRepository {
  private hotels: Hotel[] = [];
 private paginate(items: Hotel[], page: Page, limit: Limit): Hotel[] {
    const start = (page.value - 1) * limit.value;
    const end = start + limit.value;
    return items.slice(start, end);
  }

  async getAll(page: Page, limit: Limit): Promise<Hotel[]> {
    const active = this.hotels.filter(h => h.status.getValue() !== "BLOCKED");
    return this.paginate(active, page, limit);
  }

  async getOneByEmail(email: HotelEmail): Promise<Hotel | null> {
    return this.hotels.find(h => h.email.getValue() === email.getValue()) ?? null;
  }

  async getOneById(id: HotelId): Promise<Hotel | null> {
    return this.hotels.find(h => h.hotelId?.value === id.value) ?? null;
  }

  async create(hotel: Hotel): Promise<Hotel> {
    hotel.hotelId = new HotelId((this.hotels.length + 1).toString());

    const exists = this.hotels.some(h => h.email.getValue() === hotel.email.getValue());
    if (exists) throw new Error("Hotel already exists");

    this.hotels.push(hotel);
    return hotel;
  }

  async edit(hotel: Hotel): Promise<Hotel> {
    const index = this.hotels.findIndex(h => h.hotelId?.value === hotel.hotelId?.value);
    if (index === -1) throw new Error("Hotel not found");

    this.hotels[index] = hotel;
    return hotel;
  }

   async updateStatus(id: HotelId, status: HotelStatus): Promise<void>  {
    const index = this.hotels.findIndex(h => h.hotelId?.value === id.value);
    if (index === -1) throw new Error("Hotel not found");
    this.hotels[index].status = HotelStatus.create("BLOCKED");
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

  async getByProvider(providerData: ProviderData, page: Page, limit: Limit): Promise<Hotel[]> {
    const filtered = this.hotels.filter(
      h => h.providerData.getValue() === providerData.getValue()
    );
    return this.paginate(filtered, page, limit);
  }

  async findExpiredFreePlans(now: Date): Promise<Hotel[]> {
    return this.hotels.filter(h => 
      h.plan.getValue() === "FREE" &&
      h.freePlanEnd !== undefined &&
      h.freePlanEnd <= now
    );
  }
}
