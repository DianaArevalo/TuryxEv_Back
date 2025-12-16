import { LimitValueObject, PageValueObject } from "~/lib/Shared/domain";
import { HotelRepository } from "../../domain";


interface GetAllHotels {
    page?: number;
    limit?: number;
}

export class HotelGetALL {
    constructor(private readonly repository: HotelRepository){}

    async handler(props: GetAllHotels){
        const result = await this.repository.getAll(
            PageValueObject.create(props.page),
            LimitValueObject.create(props.limit)
        );

        return result.map((it) => it.toResponse())
    }
}