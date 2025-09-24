import { ReservationStatus } from "~/lib/Reservation/domain";

describe("ReservationStatus", () => {
  it("should create a status with default PENDING", () => {
    const status = ReservationStatus.create();

    expect(status).toBeInstanceOf(ReservationStatus);
    expect(status.value).toBe("PENDING");
  });

  it("should create a status explicitly as CONFIRMED", () => {
    const status = ReservationStatus.create("CONFIRMED");

    expect(status.value).toBe("CONFIRMED");
  });

  it("should create a status explicitly as CANCELLED", () => {
    const status = ReservationStatus.create("CANCELLED");

    expect(status.value).toBe("CANCELLED");
  });

  it("should map to primitives correctly", () => {
    expect(ReservationStatus.create("PENDING").toPrimitives()).toBe(0);
    expect(ReservationStatus.create("CONFIRMED").toPrimitives()).toBe(1);
    expect(ReservationStatus.create("CANCELLED").toPrimitives()).toBe(2);
  });

  it("should create from primitives correctly", () => {
    expect(ReservationStatus.fromPrimitives(0).value).toBe("PENDING");
    expect(ReservationStatus.fromPrimitives(1).value).toBe("CONFIRMED");
    expect(ReservationStatus.fromPrimitives(2).value).toBe("CANCELLED");
  });

  it("should throw if fromPrimitives receives an invalid number", () => {
    expect(() => ReservationStatus.fromPrimitives(3)).toThrow(
      "ReservationStatus inválido: 3"
    );
    expect(() => ReservationStatus.fromPrimitives(-1)).toThrow(
      "ReservationStatus inválido: -1"
    );
  });
});
