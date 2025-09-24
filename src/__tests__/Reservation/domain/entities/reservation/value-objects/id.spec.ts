import { ReservationId } from "~/lib/Reservation/domain";

describe("ReservationId", () => {
  it("should create a ReservationId with a string value", () => {
    const reservationId = new ReservationId("res-456");

    expect(reservationId).toBeInstanceOf(ReservationId);
    expect(reservationId.value).toBe("res-456");
  });
});
