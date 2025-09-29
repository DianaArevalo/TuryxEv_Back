import { Hotel, HotelEmail, HotelI, HotelId, HotelPlanT, HotelStatusT, ProviderDataT } from "../entities";
import { HotelRoleT } from "../entities/Hotel/value-objects/HotelRole";
import { CityRepository } from "./CityRepository";

export interface HotelRepository {
    getAll():(hotel: HotelI) => Promise<HotelI[]>;
    getOneByEmail(email: HotelEmail): Promise<HotelI | null>;
    getOneById(id: HotelId): Promise<HotelI>;
    create(hotel: HotelI): Promise<HotelI>;
    edit(hotel: HotelI): Promise<HotelI>;
    delete(id: HotelId): Promise<void>;

    // Methods business logic

    getByPlan(plan: HotelPlanT): Promise<HotelI[]>
    getByRole(role: HotelRoleT): Promise<HotelI[]>
    getByStatus(status: HotelStatusT): Promise<HotelI[]>
    getByLocation(location: CityRepository): Promise<HotelI[]>
    getByProvider(provider: ProviderDataT): Promise<HotelI[]>
}