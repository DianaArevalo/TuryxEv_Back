import { HotelRole } from "~/lib/Hotel/domain";

describe("Hotel/domain/value-objects/hotel-role", () => {
  it("should create from primitives", () => {
    expect(HotelRole.fromPrimitives(1).value).toBe("HOTEL");
  });

  it("should throw error when value is invalid", () => {
    expect(() => HotelRole.create("ANY Role" as any)).toThrow(
      "Invalid value: ANY Role"
    );
  });

  it("should throw error when value primitive is invalid", () => {
    expect(() => HotelRole.fromPrimitives(5 as 1 | 2)).toThrow(
      "Invalid role: 5"
    );
  });
});
