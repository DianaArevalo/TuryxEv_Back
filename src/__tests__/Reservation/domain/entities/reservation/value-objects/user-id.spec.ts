import { ReservationUserId } from "~/lib/Reservation/domain";

describe("ReservationUserId", () => {
  it("should create a ReservationUserId with a string value", () => {
    const userId = new ReservationUserId("user-111");

    expect(userId).toBeInstanceOf(ReservationUserId);
    expect(userId.value).toBe("user-111");
  });
});
