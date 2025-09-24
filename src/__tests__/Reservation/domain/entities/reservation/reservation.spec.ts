import {
  Reservation,
  ReservationCheckInDate,
  ReservationCheckOutDate,
  ReservationCreatedAt,
  ReservationUpdatedAt,
  ReservationId,
  ReservationUserId,
  ReservationHotelId,
  ReservationStatus,
  ReservationTotalAmount,
  ReservationPaymentId,
} from "~/lib/Reservation/domain";

describe("Reservation", () => {
  let checkIn: ReservationCheckInDate;
  let checkOut: ReservationCheckOutDate;
  let createdAt: ReservationCreatedAt;
  let updatedAt: ReservationUpdatedAt;

  beforeEach(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    checkIn = ReservationCheckInDate.create(tomorrow);
    checkOut = ReservationCheckOutDate.create(dayAfterTomorrow, checkIn.value);

    createdAt = ReservationCreatedAt.create(
      new Date(today.getTime() - 24 * 60 * 60 * 1000)
    ); // ayer
    updatedAt = ReservationUpdatedAt.create(
      new Date(today.getTime()),
      createdAt
    );
  });

  it("should create a reservation with all required attributes", () => {
    const reservation = new Reservation({
      reservationId: new ReservationId("res-123"),
      userId: new ReservationUserId("user-456"),
      hotelId: new ReservationHotelId("hotel-789"),
      checkInDate: checkIn,
      checkOutDate: checkOut,
      status: ReservationStatus.create("PENDING"),
      totalAmount: ReservationTotalAmount.create(100),
      createdAt,
      updatedAt,
    });

    expect(reservation.reservationId.value).toBe("res-123");
    expect(reservation.userId.value).toBe("user-456");
    expect(reservation.hotelId.value).toBe("hotel-789");
    expect(reservation.checkInDate.value).toEqual(checkIn.value);
    expect(reservation.checkOutDate.value).toEqual(checkOut.value);
    expect(reservation.status.value).toBe("PENDING");
    expect(reservation.totalAmount.value).toBe(10000);
    expect(reservation.createdAt.value).toEqual(createdAt.value);
    expect(reservation.updatedAt.value).toEqual(updatedAt.value);
    expect(reservation.paymentId).toBeUndefined();
  });

  it("should return correct response from toResponse()", () => {
    const reservation = new Reservation({
      reservationId: new ReservationId("res-123"),
      userId: new ReservationUserId("user-456"),
      hotelId: new ReservationHotelId("hotel-789"),
      checkInDate: checkIn,
      checkOutDate: checkOut,
      status: ReservationStatus.create("CONFIRMED"),
      totalAmount: ReservationTotalAmount.create(250.5),
      createdAt,
      updatedAt,
      paymentId: new ReservationPaymentId("pay-001"),
    });

    const response = reservation.toResponse();

    expect(response).toEqual({
      reservationId: "res-123",
      userId: "user-456",
      checkInDate: checkIn.value,
      checkOutDate: checkOut.value,
      status: "CONFIRMED",
      totalAmount: 25050, // stored in cents
      createdAt: createdAt.value,
      updatedAt: updatedAt.value,
    });
  });
});
