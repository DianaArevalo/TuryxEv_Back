import { HotelId, HotelRepository, HotelStatus } from "../../domain";

interface HotelUpdatedStatusProps {
    id: string;
}

export class HotelUpdatedStatus {
    constructor(private readonly repository: HotelRepository){}

    async handler (props: HotelUpdatedStatusProps){
        const hotelId = new HotelId(props.id)
        const status = HotelStatus.create("BLOCKED");

        await this.repository.updateStatus(hotelId, status)

        console.info("The user has been blocked and is under verification for account desactivation, with no monetary refund")
    }
} 