
import { LimitValueObject, PageValueObject } from "../../../../lib/Shared/domain";
import { Hotel, HotelEmail, HotelI, HotelId, HotelPlan, HotelProviderData, HotelStatus } from "../entities";
import { HotelRole} from "../entities/Hotel/value-objects/HotelRole";


export interface HotelRepository {
    getAll(PageValueObject: PageValueObject, limit: LimitValueObject): Promise<Hotel[]>;
    getOneByEmail(email: HotelEmail): Promise<Hotel | null>;
    getOneById(id: HotelId): Promise<Hotel | null>;
    create(hotel: HotelI): Promise< Hotel>;
    edit(hotel: Hotel): Promise<Hotel | void>;
    //delete(id: HotelId): Promise<void>;
    updateStatus(id: HotelId, status: HotelStatus): Promise<void>;

    // Methods business logic

    getByPlan(plan: HotelPlan, PageValueObject: PageValueObject, limit: LimitValueObject): Promise<Hotel[]>
    getByRole(role: HotelRole, PageValueObject: PageValueObject, limit: LimitValueObject): Promise<Hotel[]>
    getByStatus(status: HotelStatus, PageValueObject: PageValueObject, limit: LimitValueObject ): Promise<Hotel[]>
    
    getByProvider(provider: HotelProviderData, PageValueObject: PageValueObject, limit: LimitValueObject): Promise<Hotel[]>
    //findExpiredFreePlans(now: Date, id: HotelId): Promise<Hotel[]>;
    findExpiredFreePlans(currentDate: Date): Promise<Hotel[]>
}