import { HotelId, HotelRepository } from "../../domain";

interface FindExpiredPlansProps {
    now: Date;
    id: string;
}

export class FindExpiredPlans {
    constructor (private readonly repository: HotelRepository){}

    async handler(props: FindExpiredPlansProps){
        const hotelId = new HotelId(props.id);

        const expiredHotels = await this.repository.findExpiredFreePlans(
            props.now,
            hotelId
        );

        for (const hotel of expiredHotels){
            hotel.block();
            await this.repository.edit(hotel);
        }

        return expiredHotels;
    }
}