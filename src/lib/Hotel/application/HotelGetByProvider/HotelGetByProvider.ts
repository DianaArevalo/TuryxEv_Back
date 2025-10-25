import { Page } from "~/lib/Shared/domain/value-objects/page";
import { HotelRepository, ProviderData, ProviderDataT } from "../../domain";
import { Limit } from "~/lib/Shared/domain/value-objects/limit";

interface HotelGetByProviderProps {
    providerData: string;
    page?: number;
    limit?: number;
}

export class HotelGetByProvider{
    constructor(private readonly repository: HotelRepository){}

    async handler(props: HotelGetByProviderProps){
        const result = await this.repository.getByProvider(
            ProviderData.create(props.providerData as ProviderDataT ),
            Page.create(props.page),
            Limit.create(props.limit) 
        )
    }
}