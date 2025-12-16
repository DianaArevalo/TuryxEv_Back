
import { LimitValueObject, PageValueObject } from "../../../../lib/Shared/domain";
import { HotelRepository, HotelStatus, HotelStatusT } from "../../domain";


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
            PageValueObject.create(props.page),
            LimitValueObject.create(props.limit)
        );

         return result.map((it) => it.toResponse());
    }
}