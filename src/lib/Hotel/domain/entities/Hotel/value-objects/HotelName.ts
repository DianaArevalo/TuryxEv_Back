import { NameValueObject } from "../../../../../../lib/Shared/domain";

export class HotelName extends NameValueObject {
    

   
    getValue(): string {
        return this.value;
    }
}