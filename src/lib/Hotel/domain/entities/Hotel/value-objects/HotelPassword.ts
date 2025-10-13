import { PasswordValueObject } from "~/lib/Shared/domain";

export class HotelPassword extends PasswordValueObject {
   

    getValue(): string {
        return this.value;      
    }

    } 