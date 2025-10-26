import { HotelRepository } from "../../domain";
import { Page } from "../../../../lib/Shared/domain/value-objects/page";
import { Limit } from "../../../../lib/Shared/domain/value-objects/limit";

interface GetAllHotels {
    page?: number;
    limit?: number;
}

export class HotelGetALL {
    constructor(private readonly repository: HotelRepository){}

    async handler(props: GetAllHotels){
        const result = await this.repository.getAll(
            Page.create(props.page),
            Limit.create(props.limit)
        );

        return result.map((it) => it.toResponse())
    }
}