import { IdValueObject } from "../../../../../../lib/Shared/domain";

export class UserId extends IdValueObject {
    static create(value: string): UserId {
    return new UserId(value);
  }    
}