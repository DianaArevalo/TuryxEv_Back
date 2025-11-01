import { HotelFreePlanEnd } from "~/lib/Hotel/domain/entities";

describe("Hotel/domain/value-objects/hotel-free-plan-end", () => {
      it("should create a free plan end date 15 days after creation", () => {
    const createdAt = new Date("2025-10-01T00:00:00Z");
    const freePlanEnd = HotelFreePlanEnd.create(createdAt);

    const expected = new Date("2025-10-16T00:00:00Z");

    expect(freePlanEnd.getValue().toISOString()).toBe(expected.toISOString());
  });

  it("should return false if current date is before expiration", () => {
    const createdAt = new Date("2025-10-01T00:00:00Z");
    const freePlanEnd = HotelFreePlanEnd.create(createdAt);
    const currentDate = new Date("2025-10-10T00:00:00Z");

    expect(freePlanEnd.hasExpired(currentDate)).toBe(false);
  });

  it("should return true if current date is after expiration", () => {
    const createdAt = new Date("2025-10-01T00:00:00Z");
    const freePlanEnd = HotelFreePlanEnd.create(createdAt);
    const currentDate = new Date("2025-10-20T00:00:00Z");

    expect(freePlanEnd.hasExpired(currentDate)).toBe(true);
  });
    })