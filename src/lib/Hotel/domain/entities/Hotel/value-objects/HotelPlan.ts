export type HotelPlanT = "FREE" | "BASIC" | "PREMIUM";

const HotelPlanTMap: Record <HotelPlanT, 0 |1 |2> = {
    FREE: 0,
    BASIC: 1,
    PREMIUM: 2    
}


const HotelPlanTReverseMap: Record<0 | 1 | 2, HotelPlanT> = {
    0: "FREE",
    1: "BASIC",
    2: "PREMIUM"
}

export class HotelPlan {
  constructor(readonly value: HotelPlanT) {}

  static create(value: HotelPlanT): HotelPlan {
    return new HotelPlan(value);
  }

  static fromPrimitives(value: 0 | 1 | 2): HotelPlan {
    const mapped = HotelPlanTReverseMap[value];
    if (!mapped) {
      throw new Error(`Invalid value: ${value}`);
    }
    return new HotelPlan(mapped);
  }

  toPrimitives(): 0 | 1 | 2 {
   return HotelPlanTMap[this.value as HotelPlanT];
  }


  getValue(): HotelPlanT {
    return this.value;
  }

}