import { ScoreValueObject } from "~/lib/Shared/domain";

export class HotelScore extends ScoreValueObject {
    

    getValue(): number {
        return this.value;
    }

}