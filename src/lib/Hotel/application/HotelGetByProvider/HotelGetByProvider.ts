import {  PageValueObject } from "../../../../lib/Shared/domain/value-objects/page";
import { HotelRepository, HotelProviderData } from "../../domain";

import { LimitValueObject, ProviderDataT } from "../../../../lib/Shared/domain";

interface HotelGetByProviderProps {
    providerData: string;
    page?: number;
    limit?: number;
}

export class HotelGetByProvider{
    constructor(private readonly repository: HotelRepository){}

    async handler(props: HotelGetByProviderProps){
        const result = await this.repository.getByProvider(
            HotelProviderData.create(props.providerData as ProviderDataT ),
            PageValueObject.create(props.page),
            LimitValueObject.create(props.limit) 
        )

        return result.map((it) => it.toResponse());
    }
}