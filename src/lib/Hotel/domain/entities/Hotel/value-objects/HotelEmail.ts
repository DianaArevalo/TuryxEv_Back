import { EmailValueObject } from "~/lib/Shared/domain";

export class HotelEmail extends EmailValueObject {
     getValue(): string {
        return this.value;
    }

}

   


