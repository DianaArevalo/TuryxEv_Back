import { EditReservation } from "~/lib/Reservation/application";
import {
  Reservation,
  ReservationCheckInDate,
  ReservationCheckOutDate,
  ReservationCreatedAt,
  ReservationHotelId,
  ReservationId,
  ReservationNotFoundError,
  ReservationStatus,
  ReservationTotalAmount,
  ReservationUpdatedAt,
  ReservationUserId,
  ReservationRepository,
} from "~/lib/Reservation/domain";
import { InMemoryReservationRepository } from "~/lib/Reservation/infrastructure/repositories/in-memory-reservation-repository";

describe("Reservation/application/edit-reservation", () => {
  let repository: ReservationRepository;
  let editReservation: EditReservation;

  const today = new Date();
  const tomorrow = new Date(today.getTime() + 1000 * 60 * 60 * 24);
  const dayAfterTomorrow = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 2);

  beforeEach(async () => {
    repository = new InMemoryReservationRepository();
    editReservation = new EditReservation(repository);

    const reservation = new Reservation({
      reservationId: new ReservationId("res-1"),
      userId: new ReservationUserId("user-1"),
      hotelId: new ReservationHotelId("hotel-1"),
      checkInDate: ReservationCheckInDate.create(tomorrow),
      checkOutDate: ReservationCheckOutDate.create(dayAfterTomorrow, tomorrow),
      status: ReservationStatus.create("PENDING"),
      totalAmount: ReservationTotalAmount.create(100),
      createdAt: ReservationCreatedAt.create(today),
      updatedAt: new ReservationUpdatedAt(today),
    });

    await repository.create(reservation);
  });

  it("should edit check-in date", async () => {
    const newCheckIn = new Date(today.getTime() + 1000 * 60 * 60 * 36); // un día y medio más

    await editReservation.handler({
      reservationId: "res-1",
      checkInDate: newCheckIn,
    });

    const updated = await repository.getOneByReservationId(
      new ReservationId("res-1")
    );
    expect(updated?.checkInDate.value).toEqual(newCheckIn);
  });

  it("should edit check-out date", async () => {
    const newCheckOut = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 4);

    await editReservation.handler({
      reservationId: "res-1",
      checkOutDate: newCheckOut,
    });

    const updated = await repository.getOneByReservationId(
      new ReservationId("res-1")
    );
    expect(updated?.checkOutDate.value).toEqual(newCheckOut);
  });

  it("should edit both check-in and check-out dates", async () => {
    const newCheckIn = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 5);
    const newCheckOut = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 6);

    await editReservation.handler({
      reservationId: "res-1",
      checkInDate: newCheckIn,
      checkOutDate: newCheckOut,
    });

    const updated = await repository.getOneByReservationId(
      new ReservationId("res-1")
    );
    expect(updated?.checkInDate.value).toEqual(newCheckIn);
    expect(updated?.checkOutDate.value).toEqual(newCheckOut);
  });

  it("should do nothing if no dates provided", async () => {
    const before = await repository.getOneByReservationId(
      new ReservationId("res-1")
    );

    await editReservation.handler({ reservationId: "res-1" });

    const after = await repository.getOneByReservationId(
      new ReservationId("res-1")
    );
    expect(after).toEqual(before);
  });

  it("should throw if reservation not found", async () => {
    await expect(
      editReservation.handler({
        reservationId: "not-found",
        checkInDate: today,
      })
    ).rejects.toBeInstanceOf(ReservationNotFoundError);
  });

  it("should throw if check-in date is invalid", async () => {
    // check-in después de check-out
    const invalidCheckIn = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 10);
    const invalidCheckOut = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 5);

    await expect(
      editReservation.handler({
        reservationId: "res-1",
        checkInDate: invalidCheckIn,
        checkOutDate: invalidCheckOut,
      })
    ).rejects.toThrow("Check-in date inválido");
  });

  it("should not update if check-out date is the same", async () => {
    const reservation = await repository.getOneByReservationId(
      new ReservationId("res-1")
    );
    const sameCheckOut = reservation!.checkOutDate.value;

    await editReservation.handler({
      reservationId: "res-1",
      checkOutDate: sameCheckOut,
    });

    const updated = await repository.getOneByReservationId(
      new ReservationId("res-1")
    );
    expect(updated?.updatedAt.value).toEqual(reservation?.updatedAt.value); // unchanged
  });
});
