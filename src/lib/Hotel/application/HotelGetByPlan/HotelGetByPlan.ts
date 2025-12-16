
import { LimitValueObject, PageValueObject } from "../../../../lib/Shared/domain";
import { HotelPlan, HotelPlanT, HotelRepository } from "../../domain";


interface HotelGetByPlanProps {
    plan: string;
    page?: number;
    limit?: number;
}

export class HotelGetByPlan {
    constructor(private readonly respository: HotelRepository){}

    async handler(props: HotelGetByPlanProps){
        const result = await this.respository.getByPlan(
            HotelPlan.create(props.plan as HotelPlanT),
            PageValueObject.create(props.page),
            LimitValueObject.create(props.limit)
        )

        return result.map((it) => it.toResponse());
    }


}