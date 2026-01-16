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
        
    }
} 