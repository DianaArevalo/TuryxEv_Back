import { Page } from "~/lib/Shared/domain/value-objects/page";
import { Hotel, HotelEmail, HotelI, HotelId, HotelPlanT, HotelStatusT, ProviderDataT } from "../entities";
import { HotelRoleT } from "../entities/Hotel/value-objects/HotelRole";
import { CityRepository } from "./CityRepository";
import { Limit } from "~/lib/Shared/domain/value-objects/limit";

export interface HotelRepository {
    getAll(page: Page, limit: Limit): Promise<Hotel[]>;
    getOneByEmail(email: HotelEmail): Promise<Hotel | null>;
    getOneById(id: HotelId): Promise<Hotel | null>;
    create(hotel: HotelI): Promise<HotelI | Hotel>;
    edit(hotel: Hotel): Promise<Hotel | void>;
    delete(id: HotelId): Promise<void>;

    // Methods business logic

    getByPlan(plan: HotelPlanT): Promise<HotelI[]>
    getByRole(role: HotelRoleT): Promise<HotelI[]>
    getByStatus(status: HotelStatusT): Promise<HotelI[]>
    getByLocation(location: CityRepository): Promise<HotelI[]>
    getByProvider(provider: ProviderDataT): Promise<HotelI[]>
    findExpiredFreePlans(now: Date): Promise<Hotel[]>;
}