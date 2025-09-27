//perfil habilitado o deshabilitado
export type HotelStatusT = "OPEN" | "CLOSED" | "BLOCKED";

const HotelStatusTMap: Record<HotelStatusT, 0 | 1 | 2> = {
    OPEN: 0,
    CLOSED: 1,
    BLOCKED: 2  
}

const HotelStatusTReverseMap: Record<0 | 1 | 2, HotelStatusT> = {
    0: "OPEN",
    1: "CLOSED",
    2: "BLOCKED"
}
export class HotelStatus {
    private readonly value: HotelStatusT

    private constructor(value: HotelStatusT) {
        this.value = value
    }

    public static create(value: HotelStatusT): HotelStatus {
      if (!(value in HotelStatusTMap)) {
        throw new Error(`Invalid statusvalue: ${value}`);
      } else {
        return new HotelStatus(value);      
      }
    }

    public static fromPrimitives(value: 0 | 1 | 2): HotelStatus {
        if (!(value in HotelStatusTReverseMap)) {
            throw new Error(`Invalid value: ${value}`);
        } else {
            return new HotelStatus(HotelStatusTReverseMap[value]);
            
        }
    }

    public toPrimitives(): 0 | 1 | 2 {
        return HotelStatusTMap[this.value as HotelStatusT];
    }

    getValue(): HotelStatusT {
        return this.value;
    }
   



}