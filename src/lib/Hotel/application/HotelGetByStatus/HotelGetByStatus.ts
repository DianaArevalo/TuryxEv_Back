import { Page } from "../../../../lib/Shared/domain/value-objects/page";
import { HotelRepository, HotelStatus, HotelStatusT } from "../../domain";
import { Limit } from "../../../../lib/Shared/domain/value-objects/limit";

interface HotelGetByStatusProps {
    status: string;
    page?: number;
    limit?: number;
}

export class HotelGetByStatus {
    constructor (private readonly repository: HotelRepository){}

    async handler(props: HotelGetByStatusProps){
        const result = await this.repository.getByStatus(
            HotelStatus.create(props.status as HotelStatusT),
            Page.create(props.page),
            Limit.create(props.limit)
        );

         return result.map((it) => it.toResponse());
    }
}