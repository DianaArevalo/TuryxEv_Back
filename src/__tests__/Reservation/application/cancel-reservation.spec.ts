import { CancelReservation } from "~/lib/Reservation/application";
import {
  Reservation,
  ReservationCheckInDate,
  ReservationCheckOutDate,
  ReservationCreatedAt,
  ReservationHotelId,
  ReservationId,
  ReservationNotFoundError,
  ReservationConfirmedError,
  ReservationStatus,
  ReservationTotalAmount,
  ReservationUpdatedAt,
  ReservationUserId,
  ReservationRepository,
} from "~/lib/Reservation/domain";
import { InMemoryReservationRepository } from "~/lib/Reservation/infrastructure/repositories/in-memory-reservation-repository";

describe("Reservation/application/cancel-reservation", () => {
  let repository: ReservationRepository;
  let cancelReservation: CancelReservation;

  beforeEach(() => {
    repository = new InMemoryReservationRepository();
    cancelReservation = new CancelReservation(repository);
  });

  it("should cancel a reservation", async () => {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 1000 * 60 * 60 * 24);

    const reservation = new Reservation({
      reservationId: new ReservationId("res-1"),
      userId: new ReservationUserId("user-1"),
      hotelId: new ReservationHotelId("hotel-1"),
      checkInDate: ReservationCheckInDate.create(today),
      checkOutDate: ReservationCheckOutDate.create(tomorrow, today),
      status: ReservationStatus.create("PENDING"),
      totalAmount: ReservationTotalAmount.create(100),
      createdAt: ReservationCreatedAt.create(today),
      updatedAt: new ReservationUpdatedAt(today),
    });

    await repository.create(reservation);

    await cancelReservation.handler({ reservationId: "res-1" });

    const updated = await repository.getOneByReservationId(
      new ReservationId("res-1")
    );

    expect(updated?.status.value).toBe("CANCELLED");
  });

  it("should throw if reservation does not exist", async () => {
    await expect(
      cancelReservation.handler({ reservationId: "not-found" })
    ).rejects.toBeInstanceOf(ReservationNotFoundError);
  });

  it("should throw if reservation is confirmed", async () => {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 1000 * 60 * 60 * 24);

    const reservation = new Reservation({
      reservationId: new ReservationId("res-2"),
      userId: new ReservationUserId("user-1"),
      hotelId: new ReservationHotelId("hotel-1"),
      checkInDate: ReservationCheckInDate.create(today),
      checkOutDate: ReservationCheckOutDate.create(tomorrow, today),
      status: ReservationStatus.create("CONFIRMED"),
      totalAmount: ReservationTotalAmount.create(100),
      createdAt: ReservationCreatedAt.create(today),
      updatedAt: new ReservationUpdatedAt(today),
    });

    await repository.create(reservation);

    await expect(
      cancelReservation.handler({ reservationId: "res-2" })
    ).rejects.toBeInstanceOf(ReservationConfirmedError);
  });
});
