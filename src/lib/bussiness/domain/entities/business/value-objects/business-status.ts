//perfil habilitado o deshabilitado
export type BusinessStatusT = "OPEN" | "CLOSED" | "BLOCKED";

const BusinessStatusTMap: Record<BusinessStatusT, 0 | 1 | 2> = {
  OPEN: 0,
  CLOSED: 1,
  BLOCKED: 2,
};

const BusinessStatusTReverseMap: Record<0 | 1 | 2, BusinessStatusT> = {
  0: "OPEN",
  1: "CLOSED",
  2: "BLOCKED",
};
export class BusinessStatus {
  constructor(readonly value: BusinessStatusT) {
    this.value = value;
  }

  public static create(value: BusinessStatusT): BusinessStatus {
    if (!(value in BusinessStatusTMap)) {
      throw new Error(`Invalid statusvalue: ${value}`);
    } else {
      return new BusinessStatus(value);
    }
  }

  public static fromPrimitives(value: 0 | 1 | 2): BusinessStatus {
    if (!(value in BusinessStatusTReverseMap)) {
      throw new Error(`Invalid value: ${value}`);
    } else {
      return new BusinessStatus(BusinessStatusTReverseMap[value]);
    }
  }

  public toPrimitives(): 0 | 1 | 2 {
    return BusinessStatusTMap[this.value as BusinessStatusT];
  }
}
