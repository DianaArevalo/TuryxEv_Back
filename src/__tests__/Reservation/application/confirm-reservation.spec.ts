import { ConfirmReservation } from "~/lib/Reservation/application";
import {
  Reservation,
  ReservationCheckInDate,
  ReservationCheckOutDate,
  ReservationCreatedAt,
  ReservationHotelId,
  ReservationId,
  ReservationNotFoundError,
  ReservationCancelledError,
  ReservationStatus,
  ReservationTotalAmount,
  ReservationUpdatedAt,
  ReservationUserId,
  ReservationRepository,
} from "~/lib/Reservation/domain";
import { InMemoryReservationRepository } from "~/lib/Reservation/infrastructure/repositories/in-memory-repository";

describe("Reservation/application/confirm-reservation", () => {
  let repository: ReservationRepository;
  let confirmReservation: ConfirmReservation;

  beforeEach(() => {
    repository = new InMemoryReservationRepository();
    confirmReservation = new ConfirmReservation(repository);
  });

  it("should confirm a reservation", async () => {
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

    await confirmReservation.handler({
      reservationId: "res-1",
      paymentId: "pay-1",
    });

    const updated = await repository.getOneByReservationId(
      new ReservationId("res-1")
    );

    expect(updated?.status.value).toBe("CONFIRMED");
  });

  it("should throw if reservation does not exist", async () => {
    await expect(
      confirmReservation.handler({
        reservationId: "not-found",
        paymentId: "pay-1",
      })
    ).rejects.toBeInstanceOf(ReservationNotFoundError);
  });

  it("should throw if reservation is cancelled", async () => {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 1000 * 60 * 60 * 24);

    const reservation = new Reservation({
      reservationId: new ReservationId("res-2"),
      userId: new ReservationUserId("user-1"),
      hotelId: new ReservationHotelId("hotel-1"),
      checkInDate: ReservationCheckInDate.create(today),
      checkOutDate: ReservationCheckOutDate.create(tomorrow, today),
      status: ReservationStatus.create("CANCELLED"),
      totalAmount: ReservationTotalAmount.create(100),
      createdAt: ReservationCreatedAt.create(today),
      updatedAt: new ReservationUpdatedAt(today),
    });

    await repository.create(reservation);

    await expect(
      confirmReservation.handler({ reservationId: "res-2", paymentId: "pay-1" })
    ).rejects.toBeInstanceOf(ReservationCancelledError);
  });
});
