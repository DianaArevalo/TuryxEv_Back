import { ReservationHotelId } from "~/lib/Reservation/domain";

describe("ReservationHotelId", () => {
  it("should create a ReservationHotelId with a string value", () => {
    const hotelId = new ReservationHotelId("hotel-123");

    expect(hotelId).toBeInstanceOf(ReservationHotelId);
    expect(hotelId.value).toBe("hotel-123");
  });
});
