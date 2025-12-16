
import { LimitValueObject, PageValueObject } from "~/lib/Shared/domain";
import { HotelRepository, HotelRole, HotelRoleT } from "../../domain";


interface HotelGetByRolProps {
    role: string;
    page?: number;
    limit?: number;
}

export class HotelGetByRol {
    constructor (private readonly repository: HotelRepository){}

    async handler(props: HotelGetByRolProps){
        const result = await this.repository.getByRole(
            HotelRole.create(props.role as HotelRoleT),
            PageValueObject.create(props.page),
            LimitValueObject.create(props.limit)
        )

        return result.map((it) => it.toResponse());
    }
}