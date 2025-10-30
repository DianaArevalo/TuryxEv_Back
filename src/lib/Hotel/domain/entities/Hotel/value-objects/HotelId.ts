import { IdValueObject } from "../../../../../../lib/Shared/domain";  

export class HotelId extends IdValueObject {
    equals(other: HotelId): boolean {
    return this.value === other.value;
  }
}