import { Limit, Page } from "~/lib/Shared/domain/value-objects";
import { HotelPlan, HotelRepository, HotelStatus} from "../../domain";

interface CheckHotelFreePlanProps {    
    currentDate: Date;
    page?: number;
    limit?: number;
}

export class CheckHotelFreePlans {
    constructor(private readonly repository: HotelRepository) {}

    async handler({currentDate, page =1, limit = 50}: CheckHotelFreePlanProps): Promise<void>{
       const plan = HotelPlan.create("FREE");
       const pageVO = new Page(page);
       const limitVO = new Limit(limit);

       const freeHotels = await this.repository.getByPlan(plan, pageVO, limitVO);

       for(const hotel of freeHotels){
        const planValue = hotel.plan.getValue();
        const statusValue = hotel.status.getValue();
        
        const isFreePlan = planValue === "FREE";
        const isExpired = hotel.freePlanEnd?.hasExpired(currentDate)?? false;

        if(isFreePlan && statusValue !== "BLOCKED" && isExpired){
            hotel.status = HotelStatus.create("BLOCKED");
            await this.repository.edit(hotel);
        }
        }

        
       }

      
    }
