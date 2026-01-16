
import { UpdatedAtValueObject } from "../../../../../../lib/Shared/domain";


export class HotelUpdatedAt extends UpdatedAtValueObject {
   
    toPrimitives(): Date {
        return this.value;
    }
}